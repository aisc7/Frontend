import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Batch } from "../models/batch.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BatchService {
  constructor(private http: HttpClient) {}

  list(): Observable<Batch[]> {
    return this.http.get<Batch[]>(`${environment.url_ms_businessAKJ}/batches`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_businessAKJ}/batches/${id}`);
  }

  get(id: number): Observable<Batch> {
    return this.http.get<Batch>(`${environment.url_ms_businessAKJ}/batches/${id}`);
  }

  create(batch: Batch): Observable<Batch> {
    delete batch.id;
    return this.http.post<Batch>(`${environment.url_ms_businessAKJ}/batches`, batch);
  }

  update(id: number, batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(`${environment.url_ms_businessAKJ}/batches/${id}`, batch);
  }
}