import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = '/api/news';  // Proxy maneja localhost:8080

  constructor(private http: HttpClient) {}

  getAllNews(): Observable<News[]> {
  console.log('📡 GET /api/news...');
  return this.http.get<News[]>(this.apiUrl).pipe(
    timeout(5000),  // 5s max
    tap(data => console.log('📡 RESP:', data)),
    catchError(err => {
      console.error('📡 ERROR:', err);
      return of([]);  // Array vacío si falla
    })
  );
}

}
