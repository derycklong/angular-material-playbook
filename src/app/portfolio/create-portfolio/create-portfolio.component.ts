import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PortfolioService } from 'src/app/controller/portfolio.service';
import { IPortfolio } from '../../model/portfolio'

export interface DialogData {
    action:string
    portfolio: IPortfolio[]
    element?
  }

@Component({
    templateUrl:'./create-portfolio.component.html',
    styleUrls: ['./create-portfolio.component.css']
    
})

export class CreatePorfolioComponent implements OnInit{
    dataSource
    formGroup:FormGroup
    buttonName:string
    titleName:string


    constructor(private formBuilder:FormBuilder,
                private dialogRef: MatDialogRef<CreatePorfolioComponent>,
                private portService:PortfolioService,
                @Inject(MAT_DIALOG_DATA) public data: DialogData
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
        let portfolioid
        if (this.data.action === "add"){
            portfolioid = this.data.portfolio.slice(-1)[0].portfolioId+ 1
        }
        else if (this.data.action === "update" || "delete"){
            portfolioid = this.data.element.portfolioId
        }

        let portfolio:IPortfolio = {
            portfolioId: portfolioid,
            symbol: newEntry.symbol,
            stockName: newEntry.stockname,
            stockLastPrice : newEntry.lastprice
        }

        
        //console.log(newEntry)
        console.log('pass into dialog compomemt before saving')
        console.log(this.data)
        console.log(portfolio)
        
        this.dialogRef.close({data : portfolio, action: this.data.action})
        //this.dataSource.data.push(portfolio)
        //this.dataSource._updateChangeSubscription();
    }

    //custom validator to check for number
    checkNaN(control){
        return (typeof +control.value === "number" && isNaN(+control.value)) ? { 'NaN' : true } : null;
    }

    //custom error message
    getErrorNaN() {
        return this.formGroup.get('lastprice').hasError('required') ? 'Symbol is required' :
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