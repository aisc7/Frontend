import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Servicio } from '../models/servicio.model'; // Asegúrate de tener este modelo definido

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  private baseUrl = `${environment.url_ms_businessAKJ}/servicios`;

  constructor(private http: HttpClient) {}

  list(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.baseUrl);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  get(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.baseUrl}/${id}`);
  }

  create(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.baseUrl, servicio);
  }

  update(id: number, servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.baseUrl}/${id}`, servicio);
  }
}
