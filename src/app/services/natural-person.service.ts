import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class NaturalPersonService {
  constructor(private http: HttpClient) {}

  list(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_ms_businessAKJ}/natural-persons`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/natural-persons/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_businessAKJ}/natural-persons/${id}`);
  }

  create(naturalPerson: any): Observable<any> {
    delete naturalPerson.id;
    return this.http.post<any>(`${environment.url_ms_businessAKJ}/natural-persons`, naturalPerson);
  }

  update(id: number, naturalPerson: any): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_businessAKJ}/natural-persons/${id}`, naturalPerson);
  }
}
