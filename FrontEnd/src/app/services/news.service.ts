import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';
import { News } from '../models/news.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = '/api/news';

  // Inyectamos HttpClient y AuthService
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Obtener todas las noticias (Público)
  getAllNews(): Observable<News[]> {
    console.log('📡 GET /api/news...');
    return this.http.get<News[]>(this.apiUrl).pipe(
      timeout(5000), 
      tap((data: News[]) => console.log('📡 RESP:', data)),
      catchError((err: any) => {
        console.error('📡 ERROR:', err);
        return of([]); 
      })
    );
  }

  // Crear noticia (Privado - Requiere Auth y sube archivos)
  createNews(
    title: string, 
    description: string, 
    longDescription: string, 
    assembly: string, 
    activityType: string, 
    file: File | null
  ): Observable<News> {
    
    // 1. Obtener cabeceras con credenciales (Basic Auth)
    const headers = this.authService.getAuthHeaders();
    
    // 2. IMPORTANTE: Eliminar 'Content-Type' para que el navegador 
    // detecte automáticamente que es un envío de archivos (multipart/form-data)
    const multipartHeaders = headers.delete('Content-Type');

    // 3. Crear el paquete de datos (FormData)
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('longDescription', longDescription);
    formData.append('assembly', assembly);
    formData.append('activityType', activityType);
    
    if (file) {
      formData.append('file', file);
    }

    // 4. Enviar al Backend
    return this.http.post<News>(this.apiUrl, formData, { headers: multipartHeaders });
  }
}