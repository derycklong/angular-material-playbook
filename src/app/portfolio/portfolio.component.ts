import { Component, OnInit } from '@angular/core'
import { PortfolioService } from '../controller/portfolio.service';

@Component({
    templateUrl:'./portfolio.component.html'
})

export class PortfolioComponent implements OnInit{

    constructor(private portService:PortfolioService){}

    ngOnInit(){
        
        this.portService.getPortfolio().subscribe(data => console.log(data))

    }

}