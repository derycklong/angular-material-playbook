import { AfterViewInit, Component, OnInit } from '@angular/core'

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThrowStmt } from '@angular/compiler';
import { CreateTransactionComponent } from '../create-transaction/create-transaction.component';
import { TickerService } from 'src/app/controller/ticker.service';
import { ActivatedRoute } from '@angular/router';
import { ITicker } from 'src/app/model/ticker';

@Component({
    selector:'view-transaction',
    templateUrl:'./view-transaction.component.html',
    styleUrls:['./view-transaction.component.css']
})


export class ViewTransactionComponent implements OnInit, AfterViewInit{
    dataSource
    tickerData
    displayedColumns: string[] = ['transactionId', 'symbol', 'transactionType', 'stockPurchasePrice','stockPurchaseQuantity','transactionDate']
    paginator: any;
    sort: any;

    constructor(public transactionDialog:MatDialog, private tickerService:TickerService, private route:ActivatedRoute){}

    ngOnInit(){
        this.loadTransaction()
    }

    loadTransaction(){
        this.dataSource = new MatTableDataSource([])
        this.tickerService.getTicker(this.route.snapshot.paramMap.get('id')).subscribe(res => {
            for (let i=0;i<res.transactions.length;i++){
                res.transactions[i].stockName = res.stockName
                res.transactions[i].symbol = res.symbol
                
            }
            console.log(res.transactions)
            this.tickerData = res
            this.dataSource=res.transactions
            
        })
    }

    ngAfterViewInit(){
       
            this.dataSource.paginator = this.paginator
            this.dataSource.sort = this.sort
        
    }

    openDialog(){
        let ticker:ITicker = {
            tickerId : this.tickerData.tickerId,
            stockName : this.tickerData.stockName,
            stockLastPrice: this.tickerData.stockLastPrice,
            symbol : this.tickerData.symbol
        }
        const dialogRef = this.transactionDialog.open(CreateTransactionComponent,{
            width:'250px',
            data: ticker
        })

        dialogRef.afterClosed().subscribe(result => {
            window.location.reload()
        })
    }

    

}