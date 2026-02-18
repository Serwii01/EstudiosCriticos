import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule], // Importamos ReactiveFormsModule
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class AdminComponent implements OnInit {
  private fb = inject(FormBuilder);
  authService = inject(AuthService);
  newsService = inject(NewsService);

  // Definición de los formularios
  loginForm!: FormGroup;
  newsForm!: FormGroup;

  assemblies = ['General', 'Sevilla', 'Málaga'];
  activityTypes = ['HUELGA', 'ASAMBLEA', 'MANIFESTACION', 'CHARLA', 'CULTURAL', 'OTRO'];
  
  loginError = false;
  selectedFile: File | null = null;

  ngOnInit(): void {
    // Inicialización del formulario de Login
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      pass: ['', [Validators.required]]
    });

    // Inicialización del formulario de Noticias con validaciones
    this.newsForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      assembly: ['General', Validators.required],
      activityType: ['OTRO', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      longDescription: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    const { user, pass } = this.loginForm.value;
    this.authService.login(user, pass).subscribe({
      next: () => {
        this.loginError = false;
      },
      error: () => {
        this.loginError = true;
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onCreateNews() {
    if (this.newsForm.invalid) {
      this.newsForm.markAllAsTouched(); // Muestra errores si intentan enviar vacío
      return;
    }

    const val = this.newsForm.value;

    this.newsService.createNews(
      val.title,
      val.description,
      val.longDescription,
      val.assembly,
      val.activityType,
      this.selectedFile
    ).subscribe({
      next: () => {
        alert('✅ Noticia publicada correctamente');
        this.newsForm.reset({ assembly: 'General', activityType: 'OTRO' });
        this.selectedFile = null;
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error al publicar la noticia.');
      }
    });
  }
}