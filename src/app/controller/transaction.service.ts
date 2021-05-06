import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";


@Injectable({
    providedIn:'root'
})

export class TransactionService {
    private transactionApi = 'https://localhost:44374/api/transaction/'

    constructor(private http:HttpClient,private _snackBar:MatSnackBar, private router:Router){}

        addTransaction(transaction){
            let options = { headers: new HttpHeaders({'content-type':'application/json'})}
            return this.http.post(this.transactionApi,JSON.stringify(transaction),options)
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
            } else if (error.error.Message){
              errMsg = error.error ? `Error code : ${error.status} - ${error.error.Message}` : error.toString();
            }
            else{
              errMsg = error.error ? `Error code : ${error.status} - ${error.message}` : error.toString();
            }
            this.openSnackBar(errMsg,"Dismiss")
            console.error(errMsg);
            return throwError(errMsg);
          }
    
}