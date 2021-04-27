import { Component, OnInit } from '@angular/core'
import { PortfolioService } from '../controller/portfolio.service';
import { IPortfolio } from '../model/portfolio'
import { MatTableDataSource } from '@angular/material/table';

@Component({
    templateUrl:'./portfolio.component.html',
    styleUrls:['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit{
    dataSource

    constructor(private portService:PortfolioService){}

    ngOnInit(){
        
        this.portService.getPortfolio().subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
        
        })

    }
    displayedColumns: string[] = ['portfolioId', 'symbol', 'stockName', 'stockLastPrice'];

}