import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { PortfolioService } from '../controller/portfolio.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreatePorfolioComponent } from './create-portfolio/create-portfolio.component';
import { IPortfolio } from '../model/portfolio'
import { catchError } from 'rxjs/operators';

export interface DialogData {
    portfolio: IPortfolio;
}

@Component({
    templateUrl:'./portfolio.component.html',
    styleUrls:['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit, AfterViewInit{
    dataSource
    displayedColumns: string[] = ['portfolioId', 'symbol', 'stockName', 'stockLastPrice']
    newId:number
    portfolio:IPortfolio
    @ViewChild(MatPaginator) paginator:MatPaginator
    @ViewChild(MatSort) sort: MatSort
    
    constructor(private portService:PortfolioService, public dialog:MatDialog ){
    }

    ngOnInit(){

        this.dataSource = new MatTableDataSource([])
        this.portService.getPortfolio().subscribe(res => {
            console.log('do hit here please')
            this.dataSource.data = res
        })
    }
    ngAfterViewInit(){
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
    }

    openDialog() {
        const dialogRef = this.dialog.open(CreatePorfolioComponent, {
          width: '500px',
          data: this.dataSource.data
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result){
                console.log('The dialog was closed');
                console.log(this.dataSource.data)
                this.dataSource.data.push(result.data)
                console.log(this.dataSource.data)
                this.dataSource._updateChangeSubscription();
            }
            //this.dataSource.data = this.dataSource.data.slice()
          });
        return dialogRef.afterClosed();
    }
    




    

}