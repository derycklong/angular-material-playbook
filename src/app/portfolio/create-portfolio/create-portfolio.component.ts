import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPortfolio } from '../../model/portfolio'

export interface DialogData {
    portfolio: IPortfolio;
  }

@Component({
    templateUrl:'./create-portfolio.component.html',
    styleUrls: ['./create-portfolio.component.css']
    
})

export class CreatePorfolioComponent implements OnInit{
    dataSource
    formGroup:FormGroup


    constructor(private formBuilder:FormBuilder,
                private dialogRef: MatDialogRef<CreatePorfolioComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IPortfolio[]
                ){}

    ngOnInit(){
        this.createForm()
        console.log('pass into dialog compomemt oninit')
        console.log(this.data)
    }

    createForm() {
        let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        this.formGroup = this.formBuilder.group({
          'symbol': [null, [Validators.required]],
          'stockname': [null, [Validators.required]],
          'lastprice': [null, [Validators.required,this.checkNaN]]
          
        });
    }

    saveEntry(newEntry){

        let portfolio:IPortfolio = {
            portfolioId: this.data.slice(-1)[0].portfolioId+ 1,
            symbol: newEntry.symbol,
            stockName: newEntry.stockname,
            stockLastPrice : newEntry.lastprice
        }
        //console.log(newEntry)
        console.log('pass into dialog compomemt before saving')
        console.log(this.data)
        console.log(portfolio)
        
        this.dialogRef.close({data : portfolio})
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

}