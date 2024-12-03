import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Contract } from "../models/contract.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ContractService {
  constructor(private http: HttpClient) {}

  list(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${environment.url_ms_businessAKJ}/contracts`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/contracts/${id}`);
  }

  get(id: number): Observable<Contract> {
    return this.http.get<Contract>(`${environment.url_ms_businessAKJ}/contracts/${id}`);
  }

  create(contract: Contract): Observable<Contract> {
    delete contract.id;
    return this.http.post<Contract>(`${environment.url_ms_businessAKJ}/contracts`, contract);
  }

  update(id: number, contract: Contract): Observable<Contract> {
    return this.http.put<Contract>(`${environment.url_ms_businessAKJ}/contracts/${id}`, contract);
  }
}