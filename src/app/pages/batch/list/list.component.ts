import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Batch } from 'src/app/models/batch.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private apiUrl = 'http://localhost:3333/batches';
  batches: Batch[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.list().subscribe((data: Batch[]) => {
      this.batches = data;
    });
  }

  list(): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.apiUrl);
  }

  create(data: Partial<Batch>): Observable<Batch> {
    return this.http.post<Batch>(this.apiUrl, data);
  }

  get(id: number): Observable<Batch> {
    return this.http.get<Batch>(`${this.apiUrl}/${id}`);
  }

  update(id: number, data: Partial<Batch>): Observable<Batch> {
    return this.http.put<Batch>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}