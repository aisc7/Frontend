import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class VehicleDriverService {
  constructor(private http: HttpClient) {}

  list(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_ms_businessAKJ}/vehicle-drivers`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/vehicle-drivers/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_businessAKJ}/vehicle-drivers/${id}`);
  }

  create(vehicleDriver: any): Observable<any> {
    delete vehicleDriver.id;
    return this.http.post<any>(`${environment.url_ms_businessAKJ}/vehicle-drivers`, vehicleDriver);
  }

  update(id: number, vehicleDriver: any): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_businessAKJ}/vehicle-drivers/${id}`, vehicleDriver);
  }
}