import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PortfolioService } from 'src/app/controller/portfolio.service';
import {IPortfolio } from '../../model/portfolio'

@Component({
    selector:'detail-portfolio',
    templateUrl:'./detail-portfolio.component.html'
})

export class DetailPortfolioComponent implements OnInit{
    
    portfolio:IPortfolio
    constructor(private route:ActivatedRoute, private portService:PortfolioService){}
    ngOnInit(){
        const id = +this.route.snapshot.paramMap.get('id')
        // this.portService.getPorfolio(this.id).subscribe(p => {
        //     console.log(p)
        // })
        this.portService.getPorfolio(id).subscribe(p=>{
            this.portfolio = p
            console.log('print port')
            console.log(this.portfolio.portfolioId)
        })
    }

}