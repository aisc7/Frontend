import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Municipality } from "../models/municipality.model";

@Injectable({
  providedIn: "root",
})
export class MunicipalityService {
  constructor(private http: HttpClient) {}

  list(): Observable<Municipality[]> {
    return this.http.get<Municipality[]>(`${environment.url_ms_businessAKJ}/municipalities`);
  }

  listByDepartment(department_id: number): Observable<Municipality[]>{
    return this.http.get<Municipality[]>(`${environment.url_ms_businessAKJ}/municipalities?department_id=${department_id}`);
  }

  createForDepartment(department_id: number, municipality:Municipality): Observable<Municipality> {
    return this.http.post<Municipality>(`${environment.url_ms_businessAKJ}/municipalities/department/${department_id}`, municipality);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/municipalities/${id}`);
  }

  get(id: number): Observable<Municipality> {
    return this.http.get<Municipality>(`${environment.url_ms_businessAKJ}/municipalities/${id}`);
  }

  create(municipality: Municipality): Observable<Municipality> {
    return this.http.post<Municipality>(`${environment.url_ms_businessAKJ}/municipalities`, municipality);
  }

  update(id: number, municipality: Municipality): Observable<Municipality> {
    return this.http.put<Municipality>(`${environment.url_ms_businessAKJ}/municipalities/${id}`, municipality);
  }
}