import { HttpClient, HttpErrorResponse, HttpHeaders,HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { IPortfolio } from '../model/portfolio'
import { catchError, tap, map} from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";

@Injectable({
  providedIn:'root'
})

export class PortfolioService {
    //private portfolioUrl = 'https://raw.githubusercontent.com/derycklong/angular-material-playbook/main/src/app/api/portfolio.json'

    private portfolioUrl = 'https://localhost:44374/api/portfolio'

    constructor(private http:HttpClient,private _snackBar: MatSnackBar, private router:Router){}

    getPortfolios():Observable<IPortfolio[]>{
      return this.http.get<IPortfolio[]>(this.portfolioUrl).pipe(
        tap(data => console.log('All', JSON.stringify(data))),
        catchError(this.handleError.bind(this))
      )
    }

    getPorfolio(id):Observable<IPortfolio>{
      return this.http.get<IPortfolio>(this.portfolioUrl+'/'+id).pipe(
        tap(data => console.log('All', JSON.stringify(data))),
        catchError(this.handleError.bind(this))
      )
    }

    savePortfolio(portfolio){
      let options = { headers: new HttpHeaders({'content-type':'application/json'},
                    )}
      return this.http.post<IPortfolio>(this.portfolioUrl,JSON.stringify(portfolio),options)
        .pipe(catchError(this.handleError.bind(this)))
    }

    updatePortfolio(portfolio){
      console.log('fire update')
      let options = { headers: new HttpHeaders({ 'content-type': 'application/json'}
      )}
      return this.http.put<IPortfolio>(this.portfolioUrl,portfolio,options)
        .pipe(catchError(this.handleError.bind(this)))
    }

    deletePortfolio(id){
      return this.http.delete(this.portfolioUrl+'/'+id)
        .pipe(catchError(this.handleError.bind(this)))
    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action);
    }


    private handleError (error: Response | any) {
      // In a real world app, you might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.error ? `Error code : ${error.status} - ${error.error.Message}` : error.toString();
      }
      this.openSnackBar(errMsg,"Dismiss")
      console.error(errMsg);
      return throwError(errMsg);
    }
    // private handleError<T> (operation = 'operation', result?:T) { //handle error (can be copied), can add more code to deal if you want to log error in database .etc
    //   return (error:any):Observable<T> => {
    //     console.error(error)
    //     console.log('hi')
    //     return of(result as T)
    //   }
    // }

    // private handleError(err: any): Observable<never> {
    //   // in a real world app, we may send the server to some remote logging infrastructure
    //   // instead of just logging it to the console
      
    //   let errorMessage: string;
    //   if (err.error instanceof ErrorEvent) {
    //     // A client-side or network error occurred. Handle it accordingly.
    //     errorMessage = `An error occurred: ${err.error.message}`;
    //   } else {
    //     // The backend returned an unsuccessful response code.
    //     // The response body may contain clues as to what went wrong,
    //     if (err.status == "0"){
    //       errorMessage = 'The server is unreachable. Check your internet connection or try again later.'
    //     }
    //     else if (err.status == "404"){
    //       errorMessage = 'Page cant be found'
    //       this.router.navigate(['/error404'])

    //     }
    //     else{
    //       errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`
    //     }
    //   }
    //   this.openSnackBar(errorMessage,"Dismiss")
    //   return throwError(errorMessage);
    // }
}