import { AfterViewInit, Component, OnInit } from '@angular/core'

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThrowStmt } from '@angular/compiler';

@Component({
    selector:'view-transaction',
    templateUrl:'./view-transaction.component.html',
    styleUrls:['./view-transaction.component.css']
})

export class ViewTransactionComponent implements OnInit, AfterViewInit{
    dataSource
    displayedColumns: string[] = ['transactionId', 'symbol', 'stockName', 'stockPurchasePrice','stockPurchaseQuantity']
    paginator: any;
    sort: any;

    ngOnInit(){
        this.dataSource = new MatTableDataSource([])
    }

    ngAfterViewInit(){
       
            this.dataSource.paginator = this.paginator
            this.dataSource.sort = this.sort
        
    }

}