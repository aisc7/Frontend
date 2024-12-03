import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Customer } from "src/app/models/costumer.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  list(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.url_ms_businessAKJ}/customers`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/customers/${id}`);
  }

  get(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${environment.url_ms_businessAKJ}/customers/${id}`);
  }

  create(customer: Customer): Observable<Customer> {
    delete customer.id;
    return this.http.post<Customer>(`${environment.url_ms_businessAKJ}/customers`, customer);
  }

  update(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${environment.url_ms_businessAKJ}/customers/${id}`, customer);
  }
}