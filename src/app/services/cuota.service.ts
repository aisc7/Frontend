import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cuota } from "../models/cuota.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CuotaService {
  constructor(private http: HttpClient) {}

  list(): Observable<Cuota[]> {
    return this.http.get<Cuota[]>(`${environment.url_ms_businessAKJ}/cuotas`);
  }

  listByContract(contract_id: number): Observable<Cuota[]>{
    return this.http.get<Cuota[]>(`${environment.url_ms_businessAKJ}/cuotas`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/cuotas/${id}`);
  }

  get(id: number): Observable<Cuota> {
    return this.http.get<Cuota>(`${environment.url_ms_businessAKJ}/cuotas/${id}`);
  }

  create(cuota: Cuota): Observable<Cuota> {
    delete cuota.id;
    return this.http.post<Cuota>(`${environment.url_ms_businessAKJ}/cuotas`, cuota);
  }

  update(id: number, cuota: Cuota): Observable<Cuota> {
    return this.http.put<Cuota>(`${environment.url_ms_businessAKJ}/cuotas/${id}`, cuota);
  }
}