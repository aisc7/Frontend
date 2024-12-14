import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DistributionCenter } from "../models/distribution-center.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DistributionCenterService {
  constructor(private http: HttpClient) {}

  list(): Observable<DistributionCenter[]> {
    return this.http.get<DistributionCenter[]>(`${environment.url_ms_businessAKJ}/distributioncenters`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/distributioncenters/${id}`);
  }

  get(id: number): Observable<DistributionCenter> {
    return this.http.get<DistributionCenter>(`${environment.url_ms_businessAKJ}/distributioncenters/${id}`);
  }

  create(distributionCenter: DistributionCenter): Observable<DistributionCenter> {
    delete distributionCenter.id;
    return this.http.post<DistributionCenter>(`${environment.url_ms_businessAKJ}/distributioncenters`, distributionCenter);
  }

  update(id: number, distributionCenter: DistributionCenter): Observable<DistributionCenter> {
    return this.http.put<DistributionCenter>(`${environment.url_ms_businessAKJ}/distributioncenters/${id}`, distributionCenter);
  }
}