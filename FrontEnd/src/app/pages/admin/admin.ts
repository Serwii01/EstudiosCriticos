import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]
import { AuthService } from '../../services/auth.service';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class AdminComponent {
  // Inyección de servicios (estilo moderno Angular 18)
  authService = inject(AuthService);
  newsService = inject(NewsService);

  // --- DATOS ---

  // Listas para los desplegables
  assemblies = ['General', 'Sevilla', 'Málaga', 'Granada', 'Córdoba'];
  activityTypes = ['HUELGA', 'ASAMBLEA', 'MANIFESTACION', 'CHARLA', 'CULTURAL', 'OTRO'];

  // Modelo del formulario
  formData = {
    title: '',
    description: '',     // Resumen
    longDescription: '', // Texto completo
    assembly: 'General', 
    activityType: 'OTRO',
    user: '', // Input login
    pass: ''  // Input login
  };
  
  loginError = false;
  selectedFile: File | null = null;

  // --- MÉTODOS ---

  // 1. Intentar Loguearse
  onLogin() {
    this.authService.login(this.formData.user, this.formData.pass).subscribe({
      next: () => {
        this.loginError = false;
        console.log('✅ Admin conectado');
      },
      error: () => {
        this.loginError = true;
        console.error('❌ Error de login');
      }
    });
  }

  // 2. Detectar archivo seleccionado en el input
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // 3. Enviar noticia
  onCreateNews() {
    // Validación básica
    if (!this.formData.title) {
      alert('El título es obligatorio');
      return;
    }

    this.newsService.createNews(
      this.formData.title,
      this.formData.description,
      this.formData.longDescription,
      this.formData.assembly,
      this.formData.activityType,
      this.selectedFile
    ).subscribe({
      next: (res) => {
        alert('✅ Noticia publicada correctamente');
        // Limpiar formulario
        this.formData.title = '';
        this.formData.description = '';
        this.formData.longDescription = '';
        this.selectedFile = null;
        // (Opcional) Resetear selects a valores por defecto
        this.formData.assembly = 'General';
        this.formData.activityType = 'OTRO';
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error al publicar. Asegúrate de estar logueado y que el servidor funcione.');
      }
    });
  }
}