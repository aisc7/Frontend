import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Vehiculo } from "../models/vehiculo.model";
import { Route } from "../models/route.model";

@Injectable({
  providedIn: "root",
})
export class RouteService {
  constructor(private http: HttpClient) {}

  list(): Observable<Route[]> {
    return this.http.get<Route[]>(`${environment.url_ms_businessAKJ}/routes`);
  }

  listByVehiculo(vehiculo_id:number): Observable<Route[]> {
    return this.http.get<Route[]>(`${environment.url_ms_businessAKJ}/routes?vehiculo_id=${vehiculo_id}`);
  }

  listByContract(contract_id:number): Observable<Route[]> {
    return this.http.get<Route[]>(`${environment.url_ms_businessAKJ}/routes?contract_id=${contract_id}`);
  }
  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/routes/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_businessAKJ}/routes/${id}`);
  }

  create(route: any): Observable<any> {
    delete route.id;
    return this.http.post<any>(`${environment.url_ms_businessAKJ}/routes`, route);
  }

  update(id: number, route: any): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_businessAKJ}/routes/${id}`, route);
  }
}