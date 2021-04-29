import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { PortfolioService } from '../controller/portfolio.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatePorfolioComponent } from './create-portfolio/create-portfolio.component';
import { IPortfolio } from '../model/portfolio'
import { DeletePortfolioComponent } from './delete-portfolio/delete-portfolio.component';

import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';



@Component({
    templateUrl:'./portfolio.component.html',
    styleUrls:['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit, AfterViewInit{
    dataSource
    displayedColumns: string[] = ['select','portfolioId', 'symbol', 'stockName', 'stockLastPrice','action']
    newId:number
    portfolio:IPortfolio
    selection = new SelectionModel(true, [])
    @ViewChild(MatPaginator) paginator:MatPaginator
    @ViewChild(MatSort) sort: MatSort
    symbolFilter = new FormControl()
    stockNameFilter = new FormControl()

    filteredValues = { symbol:'', stockname:''}
    
    constructor(private portService:PortfolioService, public dialog:MatDialog ){
    }

    ngOnInit(){
        this.dataSource = new MatTableDataSource([])
        this.portService.getPortfolio().subscribe(res => {
            console.log('do hit here please')
            this.dataSource.data = res
        })
        this.dataSource.filterPredicate = function(data, filter): boolean {
            console.log(filter)
            
            return data.symbol.toLowerCase().includes(JSON.parse(filter).symbol) && 
            data.stockName.toLowerCase().includes(JSON.parse(filter).stockname);
          };
    }

    ngAfterViewInit(){
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
    }
    applySymbolFilter(value){
        this.filteredValues['symbol'] = value
        this.dataSource.filter = JSON.stringify(this.filteredValues)
        console.log(JSON.parse(this.dataSource.filter).symbol)
    }

    applyStockNameFilter(value) {
        this.filteredValues['stockname'] = value
        this.dataSource.filter = JSON.stringify(this.filteredValues)
        console.log(JSON.parse(this.dataSource.filter).stockname)
    }

          /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isSelected() ?
            this.selection.clear() :
            this.dataSource.connect().value.forEach(row => this.selection.select(row));
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    isSelected() {
        return this.selection.hasValue() ? true : false
    }

    removeSelectedRows() {
    this.selection.selected.forEach(item => {
        const index = this.dataSource.data.findIndex(inc => inc === item );
        console.log(index)
        this.dataSource.data.splice(index,1)
    });
    //this.dataSource._updateChangeSubscription()
    console.log(this.isAllSelected())
    this.dataSource.paginator = this.paginator
    this.selection.clear()
    this.dataSource._updateChangeSubscription()

    
    
    }


    openDeleteDialog(action,element){
        const dialogRef = this.dialog.open(DeletePortfolioComponent, {
            width: '300px',
            data: { action: action, element:element}
        })

        dialogRef.afterClosed().subscribe(result => {
            if (result === undefined){
                //just to prevent error when closing the modal dialog without any action
            }
            else{
                const index = this.dataSource.data.findIndex(res => res.portfolioId === result.element.portfolioId)
                if (index !== -1){
                    this.dataSource.data.splice(index,1)
                    this.selection.clear()
                    this.dataSource._updateChangeSubscription()
                }
            }

        })
    }

    openDialog(action,element) {
        const dialogRef = this.dialog.open(CreatePorfolioComponent, {
          width: '500px',
          data: { action: action , portfolio: this.dataSource.data , element: element }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === undefined){
                //just to prevent error when closing the modal dialog without any action
            }
            else if (result.action === "add"){
                this.dataSource.data.push(result.data)
                console.log('Add object')
                console.log(result.data)
                this.dataSource._updateChangeSubscription();
            }

            else if (result.action === "update") {
                const index = this.dataSource.data.findIndex(res => res.portfolioId === result.data.portfolioId);
                if (index !== -1) {
                  this.dataSource.data[index] = result.data;
                  this.dataSource.data = this.dataSource.data.slice(0);
                  console.log('after update object')
                  console.log(result.data)
                  this.dataSource._updateChangeSubscription()
                  //this.table.renderRows();
                }
            }
            //this.dataSource.data = this.dataSource.data.slice()
          });
        //return dialogRef.afterClosed();
    }

    




    

}