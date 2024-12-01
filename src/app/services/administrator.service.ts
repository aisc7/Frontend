import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Administrator } from "../models/administrator.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AdministratorService {
  constructor(private http: HttpClient) {}

  list(): Observable<Administrator[]> {
    return this.http.get<Administrator[]>(`${environment.url_ms_businessAKJ}/administrators`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/administrators/${id}`);
  }

  get(id: number): Observable<Administrator> {
    return this.http.get<Administrator>(`${environment.url_ms_businessAKJ}/administrators/${id}`);
  }

  create(administrator: Administrator): Observable<Administrator> {
    delete administrator.id;
    return this.http.post<Administrator>(`${environment.url_ms_businessAKJ}/administrators`, administrator);
  }

  update(id: number, administrator: Administrator): Observable<Administrator> {
    return this.http.put<Administrator>(`${environment.url_ms_businessAKJ}/administrators/${id}`, administrator);
  }
}