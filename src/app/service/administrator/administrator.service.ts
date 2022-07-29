import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const API_SERVER = "https://parking-project-operations.herokuapp.com/administrator/";

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private httpClient: HttpClient) { }

  getAllAdministrators(): Observable<any>{
    return this.httpClient.get(API_SERVER + "list", httpOptions);
  }

  saveAdministrator(administrator:any): Observable<any>{
    console.log("Hello from add service")
    return this.httpClient.post(API_SERVER + "save", administrator, httpOptions);
  }

  deleteAdministrator(id:number): Observable<any>{
    return this.httpClient.delete(API_SERVER + "delete/" + id,httpOptions)
  }

  editAdministrator(administrator:any): Observable<any>{
    
    console.log("Hello from edit service")
    return this.httpClient.put(API_SERVER + "update/" + administrator.id,administrator, httpOptions)
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
