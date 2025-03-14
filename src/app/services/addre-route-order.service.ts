import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AddreRouteOrder } from "../models/addre-route-order.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AddreRouteOrderService {
  constructor(private http: HttpClient) {}

  list(): Observable<AddreRouteOrder[]> {
    return this.http.get<AddreRouteOrder[]>(`${environment.url_ms_businessAKJ}/addrerouteorders`);
  }

  listByRoute(route_id:number): Observable<AddreRouteOrder[]>{
    return this.http.get<AddreRouteOrder[]>(`${environment.url_ms_businessAKJ}/addrerouteorders?route_id=${route_id}`)
  }
  createForRoute(route_id: number, addreRouteOrder:AddreRouteOrder): Observable<AddreRouteOrder> {
    return this.http.post<AddreRouteOrder>(`${environment.url_ms_businessAKJ}/addrerouteorders/route/${route_id}`, addreRouteOrder);
  }

  listByAddress(address_id:number): Observable<AddreRouteOrder[]>{
    return this.http.get<AddreRouteOrder[]>(`${environment.url_ms_businessAKJ}/addrerouteorders?address_id=${address_id}`)
  }

  createForAddress(address_id: number, addreRouteOrder: AddreRouteOrder): Observable<AddreRouteOrder> {
    return this.http.post<AddreRouteOrder>(`${environment.url_ms_businessAKJ}/addrerouteorders/address/${address_id}`, addreRouteOrder);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/addrerouteorders/${id}`);
  }

  get(id: number): Observable<AddreRouteOrder> {
    return this.http.get<AddreRouteOrder>(`${environment.url_ms_businessAKJ}/addrerouteorders/${id}`);
  }

  create(addreRouteOrder: AddreRouteOrder): Observable<AddreRouteOrder> {
    delete addreRouteOrder.id;
    return this.http.post<AddreRouteOrder>(`${environment.url_ms_businessAKJ}/addrerouteorders`, addreRouteOrder);
  }

  update(id: number, addreRouteOrder: AddreRouteOrder): Observable<AddreRouteOrder> {
    return this.http.put<AddreRouteOrder>(`${environment.url_ms_businessAKJ}/addrerouteorders/${id}`, addreRouteOrder);
  }
  view(id: number): Observable<AddreRouteOrder> {
    return this.http.get<AddreRouteOrder>(`${environment.url_ms_businessAKJ}/addrerouteorders/${id}`);
  }
}