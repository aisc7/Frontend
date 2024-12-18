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
    return this.http.get<CategoryProduct[]>(`${environment.url_ms_businessAKJ}/categoryproducts`);
  }
  listByProduct(product_id:number): Observable<CategoryProduct[]> {
    return this.http.get<CategoryProduct[]>(`${environment.url_ms_businessAKJ}/categoryproducts?product_id=${product_id}`);
  }
  listByCategory(category_id:number): Observable<CategoryProduct[]> {
    return this.http.get<CategoryProduct[]>(`${environment.url_ms_businessAKJ}/categoryproducts?category_id=${category_id}`);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/categoryproducts/${id}`);
  }

  get(id: number): Observable<CategoryProduct> {
    return this.http.get<CategoryProduct>(`${environment.url_ms_businessAKJ}/categoryproducts/${id}`);
  }

  create(categoryProduct: CategoryProduct): Observable<CategoryProduct> {
    delete categoryProduct.id;
    return this.http.post<CategoryProduct>(`${environment.url_ms_businessAKJ}/categoryproducts`, categoryProduct);
  }

  update(id: number, categoryProduct: CategoryProduct): Observable<CategoryProduct> {
    return this.http.put<CategoryProduct>(`${environment.url_ms_businessAKJ}/categoryproducts/${id}`, categoryProduct);
  }
}