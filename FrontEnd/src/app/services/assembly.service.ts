import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assembly } from '../models/assembly.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssemblyService {
  private apiUrl = `${environment.apiUrl}/api/assemblies`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll(): Observable<Assembly[]> {
    return this.http.get<Assembly[]>(this.apiUrl);
  }

  create(assembly: Partial<Assembly>): Observable<Assembly> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Assembly>(this.apiUrl, assembly, { headers });
  }

  delete(id: number): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
