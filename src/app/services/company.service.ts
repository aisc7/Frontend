import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Company } from "../models/company.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  list(): Observable<Company[]> {
    return this.http.get<Company[]>(`${environment.url_ms_businessAKJ}/companies`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/companies/${id}`);
  }

  get(id: number): Observable<Company> {
    return this.http.get<Company>(`${environment.url_ms_businessAKJ}/companies/${id}`);
  }

  create(company: Company): Observable<Company> {
    delete company.id;
    return this.http.post<Company>(`${environment.url_ms_businessAKJ}/companies`, company);
  }

  update(id: number, company: Company): Observable<Company> {
    return this.http.put<Company>(`${environment.url_ms_businessAKJ}/companies/${id}`, company);
  }
}