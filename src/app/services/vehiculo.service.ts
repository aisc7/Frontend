import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class VehiculoService {
  constructor(private http: HttpClient) {}

  list(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_ms_businessAKJ}/vehiculos`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/vehiculos/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_businessAKJ}/vehiculos/${id}`);
  }

  create(vehiculo: any): Observable<any> {
    delete vehiculo.id;
    return this.http.post<any>(`${environment.url_ms_businessAKJ}/vehiculos`, vehiculo);
  }

  update(id: number, vehiculo: any): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_businessAKJ}/vehiculos/${id}`, vehiculo);
  }
}