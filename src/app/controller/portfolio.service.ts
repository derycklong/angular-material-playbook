import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { IPortfolio } from '../model/portfolio'
import { catchError, tap, map} from 'rxjs/operators'
import { stringify } from "@angular/compiler/src/util";

@Injectable({
  providedIn:'root'
})

export class PortfolioService {
    //private portfolioUrl = 'https://raw.githubusercontent.com/derycklong/angular-material-playbook/main/src/app/api/portfolio.json'

    private portfolioUrl = 'https://localhost:44374/api/portfolio'

    constructor(private http:HttpClient){}
  
    getPortfolios():Observable<IPortfolio[]>{
      return this.http.get<IPortfolio[]>(this.portfolioUrl).pipe(
        tap(data => console.log('All', JSON.stringify(data))),
        catchError(this.handleError)
      )
    }

    getPorfolio(id):Observable<IPortfolio>{
      return this.getPortfolios().pipe(
        map(portfolios => portfolios.find(p => p.portfolioId === id))
      )
    }

    savePortfolio(portfolio){
      let options = { headers: new HttpHeaders({'content-type':'application/json'},
                                                )}
      return this.http.post<IPortfolio>(this.portfolioUrl,portfolio,options)
        .pipe(catchError(this.handleError<IPortfolio>('savePortfolio')))
    }

    private handleError<T> (operation = 'operation', result?:T) { //handle error (can be copied), can add more code to deal if you want to log error in database .etc
      return (error:any):Observable<T> => {
        console.error(error)
        console.log('hi')
        return of(result as T)
      }
    }
}