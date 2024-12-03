import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoryProduct } from "../models/category-product.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CategoryProductService {
  constructor(private http: HttpClient) {}

  list(): Observable<CategoryProduct[]> {
    return this.http.get<CategoryProduct[]>(`${environment.url_ms_businessAKJ}/category-products`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/category-products/${id}`);
  }

  get(id: number): Observable<CategoryProduct> {
    return this.http.get<CategoryProduct>(`${environment.url_ms_businessAKJ}/category-products/${id}`);
  }

  create(categoryProduct: CategoryProduct): Observable<CategoryProduct> {
    delete categoryProduct.id;
    return this.http.post<CategoryProduct>(`${environment.url_ms_businessAKJ}/category-products`, categoryProduct);
  }

  update(id: number, categoryProduct: CategoryProduct): Observable<CategoryProduct> {
    return this.http.put<CategoryProduct>(`${environment.url_ms_businessAKJ}/category-products/${id}`, categoryProduct);
  }
}