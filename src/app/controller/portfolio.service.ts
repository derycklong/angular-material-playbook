import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { IPortfolio } from '../model/portfolio'
import { catchError, tap, map} from 'rxjs/operators'
import { stringify } from "@angular/compiler/src/util";

@Injectable({
  providedIn:'root'
})

export class PortfolioService {
    private portfolioUrl = 'https://raw.githubusercontent.com/derycklong/angular-material-playbook/main/src/app/api/portfolio.json'

    constructor(private http:HttpClient){}
  
    getPortfolio():Observable<IPortfolio[]>{
      return this.http.get<IPortfolio[]>(this.portfolioUrl).pipe(
        tap(data => console.log('All', JSON.stringify(data))),
        catchError(this.handleError)
      )
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      }
}