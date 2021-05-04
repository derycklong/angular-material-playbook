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
import { LoadingService } from '../shared/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThrowStmt } from '@angular/compiler';

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
    minPriceFilter = new FormControl()
    maxPriceFilter = new FormControl()

    filteredValues = { symbol:'', stockname:'',minprice:'',maxprice:''}
    
    constructor(private portService:PortfolioService, public dialog:MatDialog,public loadingService: LoadingService,private _snackBar: MatSnackBar ){
    }

    ngOnInit(){
        this.dataSource = new MatTableDataSource([])
        this.portService.getPortfolios().subscribe(res => {
            console.log('do hit here please')
            this.dataSource.data = res
        })
        this.dataSource.filterPredicate = function(data, filter): boolean {
            console.log('data')
            console.log(filter)
            var maxPrice:number
            var minPrice:number

            if (JSON.parse(filter).maxprice == ""){
                maxPrice = Infinity  
            }
            else{
                maxPrice=+JSON.parse(filter).maxprice
            }

            if (JSON.parse(filter).minprice == ""){
                minPrice = 0  
            }
            else{
                minPrice=+JSON.parse(filter).minprice
            }
            
            return data.symbol.toLowerCase().includes(JSON.parse(filter).symbol) && 
            data.stockName.toLowerCase().includes(JSON.parse(filter).stockname) &&
            (data.stockLastPrice >= minPrice &&
            data.stockLastPrice <= maxPrice)
        }
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
    applyMinPriceFilter(min){
        if (min != "")  
            this.filteredValues['minprice'] = min
        else 
            this.filteredValues['minprice'] = ""
        this.dataSource.filter = JSON.stringify(this.filteredValues)
        console.log(JSON.parse(this.dataSource.filter).minprice)

    }
    applyMaxPriceFilter(max){
        if ( max != "")  
            this.filteredValues['maxprice'] = max
        else
            this.filteredValues['maxprice'] = ""
        this.dataSource.filter = JSON.stringify(this.filteredValues)
        console.log(JSON.parse(this.dataSource.filter).maxprice)
    }
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(){
        this.isSelected() ?
            this.selection.clear() : 
            this.dataSource.connect().value.forEach(row => this.selection.select(row));
            //this.dataSource.filteredData.forEach(row => this.selection.select(row));
    }

    isAllSelected(){
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
            this.portService.deletePortfolio(this.dataSource.data[index].portfolioId).subscribe(()=>{
                this.portService.getPortfolios().subscribe(res =>{
                    this.dataSource.data = res
                })
            })
        });
        //this.dataSource._updateChangeSubscription()
        //console.log(this.isAllSelected())
        this.masterToggle();
        this.dataSource.paginator = this.paginator
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action);
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

                this.portService.deletePortfolio(result.element.portfolioId).subscribe(res => {
                    console.log('Delete :')
                    console.log(res)

                    this.openSnackBar('Succesfully Deleted: ' + res.StockName, "Dismiss")

                    this.portService.getPortfolios().subscribe(res => {
                        this.dataSource.data = res
                    })
                })
                // const index = this.dataSource.data.findIndex(res => res.portfolioId === result.element.portfolioId)
                // if (index !== -1){
                //     this.dataSource.data.splice(index,1)
                //     this.selection.clear()
                //     this.dataSource._updateChangeSubscription()
                // }
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
                //this.dataSource.data.push(result.data)
                this.portService.savePortfolio(result.data).subscribe(res => {
                    console.log('Response from GET: ')
                    console.log(res)
                    this.openSnackBar('Succesfully added: ' + res.StockName, "Dismiss")

                    this.portService.getPortfolios().subscribe(res => {
                        this.dataSource.data = res
                    })
                    //this.dataSource._updateChangeSubscription();
                })
            }
            else if (result.action === "update"){
                console.log('Update object')
                console.log(result.data)

                this.portService.updatePortfolio(result.data).subscribe(res => {
                    console.log('Response from UPDATE: ')
                    console.log(res)

                    this.openSnackBar('Successfully update: ' + res.StockName, "Dismiss")
                    this.portService.getPortfolios().subscribe(res => {
                        this.dataSource.data = res
                    })
                })
                // const index = this.dataSource.data.findIndex(res => res.portfolioId === result.data.portfolioId);
                // if (index !== -1) {
                //   this.dataSource.data[index] = result.data;
                //   this.dataSource.data = this.dataSource.data.slice(0);
                //   console.log('after update object')
                //   console.log(result.data)
                //   this.dataSource._updateChangeSubscription()
                  //this.table.renderRows();
                //}
            }
            //this.dataSource.data = this.dataSource.data.slice()
          });
        //return dialogRef.afterClosed();
    }
}