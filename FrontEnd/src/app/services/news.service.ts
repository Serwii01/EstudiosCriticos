import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';
import { News } from '../models/news.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = `${environment.apiUrl}/api/news`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl).pipe(
      timeout(5000),
      tap((data: News[]) => console.log('📡 Noticias cargadas:', data.length)),
      catchError((err: any) => {
        console.error('📡 ERROR:', err);
        return of([]);
      })
    );
  }

  getById(id: number): Observable<News> {
    return this.http.get<News>(`${this.apiUrl}/${id}`);
  }

  createNews(
    title: string,
    description: string,
    longDescription: string,
    assembly: string,
    activityType: string,
    file: File | null
  ): Observable<News> {
    const headers = this.authService.getAuthHeaders().delete('Content-Type');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('longDescription', longDescription);
    formData.append('assembly', assembly);
    formData.append('activityType', activityType);
    if (file) formData.append('file', file);
    return this.http.post<News>(this.apiUrl, formData, { headers });
  }

  deleteNews(id: number): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
