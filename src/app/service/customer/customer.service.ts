import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const API_SERVER = "http://parking-project-operations.herokuapp.com/customer/";

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  getAllCustomers(): Observable<any>{
    return this.httpClient.get(API_SERVER + "list", httpOptions);
  }

  public saveCustomer(customer:any): Observable<any>{
    return this.httpClient.post(API_SERVER + "save", customer);
  }

  deleteCustomer(id:number): Observable<any>{
    return this.httpClient.delete(API_SERVER + "delete/" + id,httpOptions)
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
