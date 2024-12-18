import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Shift } from "../models/shift.model";

@Injectable({
  providedIn: "root",
})
export class ShiftService {
  constructor(private http: HttpClient) {}

  list(): Observable<Shift[]> {
    return this.http.get<Shift[]>(`${environment.url_ms_businessAKJ}/shifts`);
  }

  listByConductor(conductor_id: number): Observable<Shift[]>{
    return this.http.get<Shift[]>(`${environment.url_ms_businessAKJ}/shifts?conductor_id=${conductor_id}`)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/shifts/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_businessAKJ}/shifts/${id}`);
  }

  create(shift: any): Observable<any> {
    delete shift.id;
    return this.http.post<any>(`${environment.url_ms_businessAKJ}/shifts`, shift);
  }

  update(id: number, shift: any): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_businessAKJ}/shifts/${id}`, shift);
  }
}