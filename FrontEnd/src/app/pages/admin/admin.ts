import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { NewsService } from '../../services/news.service';
import { AssemblyService } from '../../services/assembly.service';
import { News } from '../../models/news.model';
import { Assembly } from '../../models/assembly.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class AdminComponent implements OnInit {
  private fb = inject(FormBuilder);
  authService = inject(AuthService);
  newsService = inject(NewsService);
  assemblyService = inject(AssemblyService);

  loginForm!: FormGroup;
  newsForm!: FormGroup;
  assemblyForm!: FormGroup;

  // Datos
  assemblies: Assembly[] = [];
  noticias: News[] = [];
  activityTypes = ['HUELGA', 'ASAMBLEA', 'MANIFESTACION', 'CHARLA', 'CULTURAL', 'OTRO'];

  // Estado UI
  loginError = false;
  selectedFile: File | null = null;
  activeTab: 'noticias' | 'asambleas' = 'noticias';
  newsSuccess = false;
  assemblySuccess = false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });

    this.newsForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      assembly: ['', Validators.required],
      activityType: ['OTRO', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      longDescription: ['', [Validators.required, Validators.minLength(20)]]
    });

    this.assemblyForm = this.fb.group({
      ciudad: ['', [Validators.required, Validators.minLength(2)]],
      email: [''],
      telegramUrl: [''],
      instagramUrl: ['']
    });
  }

  // ── Auth ──────────────────────────────────────────
  onLogin() {
    if (this.loginForm.invalid) return;
    const { user, pass } = this.loginForm.value;
    this.authService.login(user, pass).subscribe({
      next: () => {
        this.loginError = false;
        this.loadData();
      },
      error: () => { this.loginError = true; }
    });
  }

  // ── Carga de datos ────────────────────────────────
  loadData() {
    this.assemblyService.getAll().subscribe(data => {
      this.assemblies = data;
      if (data.length > 0) {
        this.newsForm.patchValue({ assembly: data[0].ciudad });
      }
    });
    this.newsService.getAllNews().subscribe(data => { this.noticias = data; });
  }

  // ── Noticias ──────────────────────────────────────
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] ?? null;
  }

  onCreateNews() {
    if (this.newsForm.invalid) { this.newsForm.markAllAsTouched(); return; }
    const val = this.newsForm.value;
    this.newsService.createNews(
      val.title, val.description, val.longDescription,
      val.assembly, val.activityType, this.selectedFile
    ).subscribe({
      next: (created) => {
        this.noticias = [created, ...this.noticias];
        this.newsForm.reset({ activityType: 'OTRO', assembly: this.assemblies[0]?.ciudad ?? '' });
        this.selectedFile = null;
        this.newsSuccess = true;
        setTimeout(() => this.newsSuccess = false, 4000);
      },
      error: (err) => { console.error(err); alert('❌ Error al publicar la noticia.'); }
    });
  }

  onDeleteNews(id: number) {
    if (!confirm('¿Eliminar esta noticia? Esta acción no se puede deshacer.')) return;
    this.newsService.deleteNews(id).subscribe({
      next: () => { this.noticias = this.noticias.filter(n => n.id !== id); },
      error: () => alert('❌ Error al eliminar la noticia.')
    });
  }

  getAssemblyName(assembly: string): string {
    return assembly || 'General';
  }

  // ── Asambleas ─────────────────────────────────────
  onCreateAssembly() {
    if (this.assemblyForm.invalid) { this.assemblyForm.markAllAsTouched(); return; }
    const val = this.assemblyForm.value;

    // Email auto si vacío
    if (!val.email) {
      const slug = val.ciudad.toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/\s+/g, '');
      val.email = `eecc${slug}@gmail.com`;
    }

    this.assemblyService.create(val).subscribe({
      next: (created) => {
        this.assemblies = [...this.assemblies, created].sort((a, b) => a.ciudad.localeCompare(b.ciudad));
        this.assemblyForm.reset();
        this.assemblySuccess = true;
        setTimeout(() => this.assemblySuccess = false, 4000);
      },
      error: () => alert('❌ Error: ya existe una asamblea con ese nombre o email.')
    });
  }

  onDeleteAssembly(id: number) {
    if (!confirm('¿Eliminar esta asamblea? Los datos se perderán.')) return;
    this.assemblyService.delete(id).subscribe({
      next: () => { this.assemblies = this.assemblies.filter(a => a.id !== id); },
      error: () => alert('❌ Error al eliminar la asamblea.')
    });
  }
}
