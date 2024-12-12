import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HotelService {
  constructor(private http: HttpClient) {}

  list(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_ms_businessAKJ}/hotels`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/hotels/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_businessAKJ}/hotels/${id}`);
  }

  create(hotel: any): Observable<any> {
    delete hotel.id;
    return this.http.post<any>(`${environment.url_ms_businessAKJ}/hotels`, hotel);
  }

  update(id: number, hotel: any): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_businessAKJ}/hotels/${id}`, hotel);
  }
}