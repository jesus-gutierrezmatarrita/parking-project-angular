import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private API_SERVER = "http://parking-project-operations.herokuapp.com/customer/";

  constructor(private httpClient: HttpClient) { }

  public getAllCustomers(): Observable<any>{
    return this.httpClient.get(this.API_SERVER + "list");
  }

  public saveCustomer(customer:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER + "save", customer);
  
  }

  public deleteCustomer(id:any): Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id);
  }
}
