import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Operation } from "../models/operation.model";

@Injectable({
  providedIn: "root",
})
export class OperationService {
  constructor(private http: HttpClient) {}

  list(): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${environment.url_ms_businessAKJ}/operations`);
  }

  listByMunicipality(municipality_id: number): Observable<Operation[]>{
    return this.http.get<Operation[]>(`${environment.url_ms_businessAKJ}/operations?municipality_id=${municipality_id}`)
  }

  listByVehiculo(vehiculo_id: number): Observable<Operation[]>{
    return this.http.get<Operation[]>(`${environment.url_ms_businessAKJ}/operations?vehiculo_id=${vehiculo_id}`)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/operations/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_businessAKJ}/operations/${id}`);
  }

  create(operation: any): Observable<any> {
    delete operation.id;
    return this.http.post<any>(`${environment.url_ms_businessAKJ}/operations`, operation);
  }

  createForMunicipality(municipality_id: number, operation: Operation): Observable<Operation> {
    return this.http.post<Operation>(
      `${environment.url_ms_businessAKJ}/operations/municipality/${municipality_id}`,
      operation
    );
  }
  
  createForVehiculo(vehiculo_id: number, operation: Operation): Observable<Operation> {
    return this.http.post<Operation>(
      `${environment.url_ms_businessAKJ}/operations/vehiculo/${vehiculo_id}`,
      operation
    );
  }
  
  update(id: number, operation: any): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_businessAKJ}/operations/${id}`, operation);
  }
}