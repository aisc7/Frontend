import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Factura } from "../models/factura.model";

@Injectable({
  providedIn: "root",
})
export class FacturaService {
  constructor(private http: HttpClient) {}

  list(): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${environment.url_ms_businessAKJ}/facturas`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/facturas/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_businessAKJ}/facturas/${id}`);
  }

  create(factura: any): Observable<any> {
    delete factura.id;
    return this.http.post<any>(`${environment.url_ms_businessAKJ}/facturas`, factura);
  }

  update(id: number, factura: any): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_businessAKJ}/facturas/${id}`, factura);
  }

  payment(id: number): Observable<any> {
    return this.http.post(`${environment.url_ms_businessAKJ}/facturas/procesarPago/${id}`, {});
  }
  

  
}