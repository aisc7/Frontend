import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { OwnerVehicle } from "../models/owner-vehicle.model";

@Injectable({
  providedIn: "root",
})
export class OwnerVehicleService {
  constructor(private http: HttpClient) {}

  list(): Observable<OwnerVehicle[]> {
    return this.http.get<any[]>(`${environment.url_ms_businessAKJ}/ownervehicles`);
  }

  listByVehiculo(vehiculo_id:number): Observable<OwnerVehicle[]>{
    return this.http.get<OwnerVehicle[]>(`${environment.url_ms_businessAKJ}/ownervehicles?vehiculo_id=${vehiculo_id}`)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/ownervehicles/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_businessAKJ}/ownervehicles/${id}`);
  }

  create(ownerVehicle: any): Observable<any> {
    delete ownerVehicle.id;
    return this.http.post<any>(`${environment.url_ms_businessAKJ}/ownervehicles`, ownerVehicle);
  }

  update(id: number, ownerVehicle: any): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_businessAKJ}/ownervehicles/${id}`, ownerVehicle);
  }
}