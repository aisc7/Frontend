import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OperationService {
  constructor(private http: HttpClient) {}

  list(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_ms_businessAKJ}/operations`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/operations/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_businessAKJ}/operations/${id}`);
  }

  create(operation: any): Observable<any> {
    delete operation.id;
    return this.http.post<any>(`${environment.url_ms_businessAKJ}/operations`, operation);
  }

  update(id: number, operation: any): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_businessAKJ}/operations/${id}`, operation);
  }
}