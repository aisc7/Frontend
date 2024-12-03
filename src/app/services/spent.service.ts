import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SpentService {
  constructor(private http: HttpClient) {}

  list(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_ms_businessAKJ}/spents`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/spents/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_businessAKJ}/spents/${id}`);
  }

  create(spent: any): Observable<any> {
    delete spent.id;
    return this.http.post<any>(`${environment.url_ms_businessAKJ}/spents`, spent);
  }

  update(id: number, spent: any): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_businessAKJ}/spents/${id}`, spent);
  }
}