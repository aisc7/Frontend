import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Seguro } from "../models/seguro.model";

@Injectable({
  providedIn: "root",
})
export class SeguroService {
  constructor(private http: HttpClient) {}

  list(): Observable<Seguro[]> {
    return this.http.get<Seguro[]>(`${environment.url_ms_businessAKJ}/seguros`);
  }

  listByVehiculo(vehiculo_id: number): Observable<Seguro[]>{
    return this.http.get<Seguro[]>(`${environment.url_ms_businessAKJ}/seguros?vehiculo_id=${vehiculo_id}`)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/seguros/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_businessAKJ}/seguros/${id}`);
  }

  create(seguro: any): Observable<any> {
    delete seguro.id;
    return this.http.post<any>(`${environment.url_ms_businessAKJ}/seguros`, seguro);
  }

  update(id: number, seguro: any): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_businessAKJ}/seguros/${id}`, seguro);
  }
}