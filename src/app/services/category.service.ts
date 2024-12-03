import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../models/category.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  list(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.url_ms_businessAKJ}/categories`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/categories/${id}`);
  }

  get(id: number): Observable<Category> {
    return this.http.get<Category>(`${environment.url_ms_businessAKJ}/categories/${id}`);
  }

  create(category: Category): Observable<Category> {
    delete category.id;
    return this.http.post<Category>(`${environment.url_ms_businessAKJ}/categories`, category);
  }

  update(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${environment.url_ms_businessAKJ}/categories/${id}`, category);
  }
}