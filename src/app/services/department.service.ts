import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Department } from "../models/department.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  list(): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.url_ms_businessAKJ}/departments`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/departments/${id}`);
  }

  get(id: number): Observable<Department> {
    return this.http.get<Department>(`${environment.url_ms_businessAKJ}/departments/${id}`);
  }

  create(department: Department): Observable<Department> {
    delete department.id;
    return this.http.post<Department>(`${environment.url_ms_businessAKJ}/departments`, department);
  }

  update(id: number, department: Department): Observable<Department> {
    return this.http.put<Department>(`${environment.url_ms_businessAKJ}/departments/${id}`, department);
  }
}