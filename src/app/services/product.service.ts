import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  list(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_ms_businessAKJ}/products`);
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