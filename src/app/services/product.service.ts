import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../models/product.model";
import { observableToBeFn } from "rxjs/internal/testing/TestScheduler";
@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  list(): Observable<Product[]> {
    return this.http.get<any[]>(`${environment.url_ms_businessAKJ}/products`);
  }

  
  listByCustomer(customer_id: number): Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.url_ms_businessAKJ}/products?customer_id=${customer_id}`)
  }

  listByBatch(batch_id: number): Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.url_ms_businessAKJ}/products?batch_id=${batch_id}`)
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/products/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_businessAKJ}/products/${id}`);
  }

  create(product: any): Observable<any> {
    delete product.id;
    return this.http.post<any>(`${environment.url_ms_businessAKJ}/products`, product);
  }

  update(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_businessAKJ}/products/${id}`, product);
  }
}