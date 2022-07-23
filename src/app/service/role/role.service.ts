import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_SERVER = "http://parking-project-operations.herokuapp.com/role/";

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

  public getAllRoles(): Observable<any>{
    return this.httpClient.get(API_SERVER + "list", httpOptions);
  }

  saveRole(role:any): Observable<any>{
    return this.httpClient.post(API_SERVER + "save", role, httpOptions);
  
  }

  deleteRole(id:number): Observable<any>{
    return this.httpClient.delete(API_SERVER + "delete/" + id, httpOptions);
  }

  editRole(role:any): Observable<any>{
    console.log("Hello from edit service")
    return this.httpClient.put(API_SERVER + "update/" + role.id,role, httpOptions)
  }
}
