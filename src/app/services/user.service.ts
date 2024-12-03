import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  list(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_ms_businessAKJ}/users`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/users/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_businessAKJ}/users/${id}`);
  }

  create(user: any): Observable<any> {
    delete user.id;
    return this.http.post<any>(`${environment.url_ms_businessAKJ}/users`, user);
  }

  update(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_businessAKJ}/users/${id}`, user);
  }
}