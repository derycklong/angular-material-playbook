import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TickerService } from 'src/app/controller/ticker.service';
import { ITicker } from '../../model/ticker'

export interface PortfolioDialogData {
    action:string
    ticker: ITicker[]
    element?
  }

@Component({
    templateUrl:'./create-ticker.component.html',
    styleUrls: ['./create-ticker.component.css']
    
})

export class CreateTickerComponent implements OnInit{
    dataSource
    formGroup:FormGroup
    buttonName:string
    titleName:string
    
    constructor(private formBuilder:FormBuilder,
                private dialogRef: MatDialogRef<CreateTickerComponent>,
                private tickerService:TickerService,
                @Inject(MAT_DIALOG_DATA) public data: PortfolioDialogData
                ){}

    ngOnInit(){
        this.createForm()
        this.composeAction()
    }
    createForm() {
        this.formGroup = this.formBuilder.group({
                'symbol': [null, [Validators.required]],
                'stockname': [null, [Validators.required]],
                'lastprice': [null, [Validators.required,this.checkNaN]]
        });
        
        if (this.data.action === "update") {
            this.formGroup.controls['symbol'].setValue(this.data.element.symbol)
            this.formGroup.controls['stockname'].setValue(this.data.element.stockName)
            this.formGroup.controls['lastprice'].setValue(this.data.element.stockLastPrice)
            console.log("Before update object")
            console.log(this.data.element)
        }
        //let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }

    saveEntry(newEntry){
        // if (this.data.action === "add"){
        //     tickerId = this.data.portfolio.slice(-1)[0].tickerId+ 1
        // }
        // else if (this.data.action === "update" || "delete"){
        //     tickerId = this.data.element.tickerId
        // }
        let ticker:ITicker = {
            tickerId: this.data.element.tickerId,
            symbol: newEntry.symbol,
            stockName: newEntry.stockname,
            stockLastPrice : newEntry.lastprice
        }
        //console.log(newEntry)
        console.log('pass into dialog compomemt before saving')
        console.log(this.data)
        
        
        this.dialogRef.close({data : ticker, action: this.data.action})
        //this.dataSource.data.push(portfolio)
        //this.dataSource._updateChangeSubscription();
    }

    //custom validator to check for number
    checkNaN(control){
        return (typeof +control.value === "number" && isNaN(+control.value)) ? { 'NaN' : true } : null;
    }

    //custom error message
    getErrorNaN() {
        return this.formGroup.get('lastprice').hasError('required') ? 'Price is required' :
          this.formGroup.get('lastprice').hasError('NaN') ? 'Please enter numbers only' : ''
    }
    
    //update the button based on create or delete
    composeAction(){
        if (this.data.action === "add"){
            this.buttonName = "Submit"
            this.titleName = "Create a new entry"
        }
        else if (this.data.action === "update"){
            this.buttonName = "Update"
            this.titleName = "Update existing entry"
        }

        else if (this.data.action === "delete"){
            this.buttonName = "Delete"
            this.titleName = "Delete existing entry"
        }
    }

}