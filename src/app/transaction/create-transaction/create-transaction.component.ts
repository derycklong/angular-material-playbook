import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ITicker, ITransaction } from 'src/app/model/ticker'


export interface TransactionDialogData{
    data:any
}

@Component({
    templateUrl:'./create-transaction.component.html',
    styleUrls:['./create-transaction.component.css']

})

export class CreateTransactionComponent implements OnInit {
    formGroup:FormGroup
    ticker:ITicker
    transaction:ITransaction

    constructor(private formBuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: TransactionDialogData){}

    ngOnInit(){
        this.createForm()
        console.log(this.data.data)
    }

    createForm(){
        this.formGroup = this.formBuilder.group({
            'purchaseprice' : [null,[Validators.required]],
            'purchasequantity' : [null,[Validators.required]],
            'transactiondate' : [null,[Validators.required]]
        })
    }

    add(newEntry){
        this.ticker = {
            'tickerId' : this.data.data.tickerId,
            'stockLastPrice' : this.data.data.stockLastPrice,
            'stockName' : this.data.data.stockName,
            'symbol' : this.data.data.symbol,
            'transaction' : [this.transaction]

        }
        this.transaction = {
            'purchasePrice' : newEntry.purchaseprice,
            'purchaseQuantity' : newEntry.purchaseQuantity,
            'transactionDate' : newEntry.transactionDate
        }


    }

}