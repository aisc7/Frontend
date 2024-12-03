import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FacturaService {
  constructor(private http: HttpClient) {}

  list(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_ms_businessAKJ}/facturas`);
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
}