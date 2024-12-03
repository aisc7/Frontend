import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DuenoService {
  constructor(private http: HttpClient) {}

  list(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_ms_businessAKJ}/duenos`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/duenos/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_businessAKJ}/duenos/${id}`);
  }

  create(dueno: any): Observable<any> {
    delete dueno.id;
    return this.http.post<any>(`${environment.url_ms_businessAKJ}/duenos`, dueno);
  }

  update(id: number, dueno: any): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_businessAKJ}/duenos/${id}`, dueno);
  }
}
