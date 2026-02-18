import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Usamos la ruta base. Al enviar las credenciales, si están mal, 
  // Spring Security suele rechazar la petición incluso en rutas públicas 
  // dependiendo de la configuración, o validamos simplemente la conexión.
  private testUrl = '/api/news'; 

  // Signals para gestionar el estado de forma reactiva
  isAuthenticated = signal<boolean>(false);
  private authHeader = signal<string>('');

  constructor(private http: HttpClient) {}

  // 1. Método para Loguearse
  login(user: string, pass: string) {
    // Codificamos "usuario:contraseña" a Base64 (Estándar Basic Auth)
    const token = btoa(user + ':' + pass);
    const headerValue = 'Basic ' + token;
    
    // Creamos la cabecera solo para probar si funciona
    const headers = new HttpHeaders({ 'Authorization': headerValue });

    // Hacemos una petición de prueba (GET)
    return this.http.get(this.testUrl, { headers }).pipe(
      tap(() => {
        // Si la petición sale bien (200 OK), guardamos las credenciales
        this.isAuthenticated.set(true);
        this.authHeader.set(headerValue);
        console.log('🔑 Credenciales almacenadas correctamente');
      })
    );
  }

  // 2. Método para Cerrar Sesión
  logout() {
    this.isAuthenticated.set(false);
    this.authHeader.set('');
  }

  // 3. Método auxiliar para obtener la cabecera (Lo usa NewsService)
  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({ 
      'Authorization': this.authHeader() || '' 
    });
  }
}