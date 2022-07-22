import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_SERVER = "http://localhost:8080/product/";

  constructor(private httpClient: HttpClient) { }

  public getAllProducts(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveProduct(product:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER, product);
  
  }

  public deleteProduct(id:any): Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id);
  }
}
