import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Conductor } from "../models/conductor.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ConductorService {
  constructor(private http: HttpClient) {}

  list(): Observable<Conductor[]> {
    return this.http.get<Conductor[]>(`${environment.url_ms_businessAKJ}/conductors`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/conductors/${id}`);
  }

  get(id: number): Observable<Conductor> {
    return this.http.get<Conductor>(`${environment.url_ms_businessAKJ}/conductors/${id}`);
  }

  create(conductor: Conductor): Observable<Conductor> {
    delete conductor.id;
    return this.http.post<Conductor>(`${environment.url_ms_businessAKJ}/conductors`, conductor);
  }

  update(id: number, conductor: Conductor): Observable<Conductor> {
    return this.http.put<Conductor>(`${environment.url_ms_businessAKJ}/conductors/${id}`, conductor);
  }
}