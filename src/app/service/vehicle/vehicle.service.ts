import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_SERVER = "http://parking-project-operations.herokuapp.com/vehicle/";

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class VehicleService {

  constructor(private httpClient: HttpClient) { }

  public getAllVehicles(): Observable<any>{
    return this.httpClient.get(API_SERVER + "list", httpOptions);
  }

  saveVehicle(vehicle:any): Observable<any>{
    return this.httpClient.post(API_SERVER + "save", vehicle, httpOptions);
  
  }

  deleteVehicle(id:number): Observable<any>{
    return this.httpClient.delete(API_SERVER + "delete/" + id, httpOptions);
  }

  editVehicle(vehicle:any): Observable<any>{
    console.log("Hello from edit service")
    return this.httpClient.put(API_SERVER + "update/" + vehicle.id,vehicle, httpOptions)
  }
}
