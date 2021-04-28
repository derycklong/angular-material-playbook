import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { PortfolioService } from '../controller/portfolio.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    templateUrl:'./portfolio.component.html',
    styleUrls:['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit, AfterViewInit{
    dataSource
    displayedColumns: string[] = ['portfolioId', 'symbol', 'stockName', 'stockLastPrice'];
    @ViewChild(MatPaginator) paginator:MatPaginator
    
    constructor(private portService:PortfolioService){
        this.dataSource = new MatTableDataSource([])
        this.portService.getPortfolio().subscribe(res => {
            this.dataSource.data = res
        })
    }

    ngOnInit(){

    }

    ngAfterViewInit(){
        this.dataSource.paginator = this.paginator
    }
    

}