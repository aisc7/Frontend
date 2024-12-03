import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  list(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_ms_businessAKJ}/restaurants`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/restaurants/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_businessAKJ}/restaurants/${id}`);
  }

  create(restaurant: any): Observable<any> {
    delete restaurant.id;
    return this.http.post<any>(`${environment.url_ms_businessAKJ}/restaurants`, restaurant);
  }

  update(id: number, restaurant: any): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_businessAKJ}/restaurants/${id}`, restaurant);
  }
}