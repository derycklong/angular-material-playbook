import { Component, Inject, KeyValueDiffers, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TransactionService } from 'src/app/controller/transaction.service'
import { ITicker, ITransaction } from 'src/app/model/ticker'


export interface TransactionDialogData{
    data:any
}

@Component({
    templateUrl:'./create-transaction.component.html',
    styleUrls:['./create-transaction.component.css'],
    providers: [
    ]

})

export class CreateTransactionComponent implements OnInit {
    formGroup:FormGroup
    tickerDetail:any = null
    

    constructor(private formBuilder:FormBuilder,
                        @Inject(MAT_DIALOG_DATA) public data: TransactionDialogData,
                        private transactionService:TransactionService,
                        private dialogRef:MatDialogRef<CreateTransactionComponent>){}

    ngOnInit(){
        if (this.data){
            this.tickerDetail = this.data
            this.createPopulateForm()
        } 
        else
            this.createForm()
    }

    createForm(){
        this.formGroup = this.formBuilder.group({
            'symbol' : [null, [Validators.required]],
            'stockname' : [null, [Validators.required]],
            'transactiontype' : [null,[Validators.required]],
            'transactionprice' : [null,[Validators.required]],
            'transactionquantity' : [null,[Validators.required]],
            'transactiondate' : [null,[Validators.required]]
        })
    }

    createPopulateForm(){
        this.formGroup = this.formBuilder.group({
            'symbol' : [{value: this.tickerDetail.symbol,disabled:true}, [Validators.required]],
            'stockname' : [{value: this.tickerDetail.stockName,disabled:true}, [Validators.required]],
            'transactiontype' : [null,[Validators.required]],
            'transactionprice' : [null,[Validators.required]],
            'transactionquantity' : [null,[Validators.required]],
            'transactiondate' : [null,[Validators.required]]
        })
    }
    overrideToJSONDate() {
        Date.prototype.toJSON = function () {
          return new Date(this).toLocaleString();
        }
      }

    add(newEntry){

        let transaction:ITransaction ={
            tickerId : this.tickerDetail.tickerId,
            transactionId : null,
            transactionType : newEntry.transactiontype,
            transactionPrice : +newEntry.transactionprice,
            transactionQuantity : +newEntry.transactionquantity,
            transactionDate : JSON.parse(JSON.stringify(newEntry.transactiondate))

        }
        console.log(transaction)

        this.transactionService.addTransaction(JSON.stringify(transaction)).subscribe(res =>{
            console.log(res)
            this.dialogRef.close({})
            
        })
    }

}