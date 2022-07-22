import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private API_SERVER = "http://parking-project-operations.herokuapp.com/role/";

  constructor(private httpClient: HttpClient) { }

  public getAllRoles(): Observable<any>{
    return this.httpClient.get(this.API_SERVER + "list");
  }

  public saveRole(role:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER + "save", role);
  
  }

  public deleteRole(id:any): Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id);
  }
}
