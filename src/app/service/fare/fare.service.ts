import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_SERVER = "http://parking-project-operations.herokuapp.com/fare/";

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FareService {

  constructor(private httpClient: HttpClient) { }

  public getAllFares(): Observable<any>{
    return this.httpClient.get(API_SERVER + "list", httpOptions);
  }

  saveFare(fare:any): Observable<any>{
    return this.httpClient.post(API_SERVER + "save", fare, httpOptions);
  
  }

  deleteFare(id:number): Observable<any>{
    return this.httpClient.delete(API_SERVER + "delete/" + id, httpOptions);
  }

  editFare(fare:any): Observable<any>{
    console.log("Hello from edit service")
    return this.httpClient.put(API_SERVER + "update/" + fare.id,fare, httpOptions)
  }
}
