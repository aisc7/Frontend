import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Address } from "../models/address.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AddressService {
  constructor(private http: HttpClient) {}

  list(): Observable<Address[]> {
    return this.http.get<Address[]>(`${environment.url_ms_businessAKJ}/addresses`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/addresses/${id}`);
  }

  get(id: number): Observable<Address> {
    return this.http.get<Address>(`${environment.url_ms_businessAKJ}/addresses/${id}`);
  }

  create(address: Address): Observable<Address> {
    delete address.id;
    return this.http.post<Address>(`${environment.url_ms_businessAKJ}/addresses`, address);
  }

  update(id: number, address: Address): Observable<Address> {
    return this.http.put<Address>(`${environment.url_ms_businessAKJ}/addresses/${id}`, address);
  }
}