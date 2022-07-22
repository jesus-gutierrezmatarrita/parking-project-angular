import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private API_SERVER = "http://localhost:8080/company";

  constructor(
    private httpClient: HttpClient
  ) {}

  public getAllCompanies(): Observable<any>{
    return this.httpClient.get(this.API_SERVER)
  }
}
