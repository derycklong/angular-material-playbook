import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { TickerService } from 'src/app/controller/ticker.service';
import {ITicker } from '../../model/ticker'
import {ITransaction} from '../../model/ticker'
import { map } from 'rxjs/operators'

@Component({
    selector:'detail-ticker',
    templateUrl:'./detail-ticker.component.html'
})

export class DetailTickerComponent implements OnInit{
    averagePrice
    totalQuantity
    ticker:ITicker
    transaction:ITransaction
    constructor(private route:ActivatedRoute, private tickerService:TickerService){}
    ngOnInit(){
        const id = +this.route.snapshot.paramMap.get('id')
        // this.tickerService.getPorfolio(this.id).subscribe(p => {
        //     console.log(p)
        // })
        this.tickerService.getTicker(id).subscribe(p=>{
            this.ticker = p
            console.log('print port')
            console.log(this.ticker.tickerId)
        })
        this.tickerService.getTickerDetails(this.route.snapshot.paramMap.get('id')).subscribe(res=>{
            this.averagePrice= +res.averagePrice
            this.totalQuantity= +res.totalQuantity
        })

        this.tickerService.getTransactions().subscribe(res => {
            let buyQuantity = [].concat(...res).filter(filter => filter.tickerId==id).map(data => data.transactionQuantity).reduce((a,b)=>a+b,0)
            console.log(buyQuantity)
        })
    }

    computeTickerDetails(){
        
    }

}