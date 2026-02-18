import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  ultimasAcciones: News[] = [];
  proximamente: News[] = [];
  loading = true;
  private newsSub?: Subscription;

  constructor(private newsService: NewsService) {}

  getAssemblyName(assembly: string): string {
    const names: { [key: string]: string } = {
      'sevilla': 'Sevilla',
      'malaga': 'Málaga',
      'general': 'General'
    };
    return names[assembly?.toLowerCase()] || assembly;
  }

  ngOnInit() {
    this.cargarNoticias();
  }

  cargarNoticias() {
    this.loading = true;
    
    this.newsSub = this.newsService.getAllNews().subscribe({
      next: (data: News[]) => {
        if (data && data.length > 0) {
          const hoy = new Date();
          hoy.setHours(0, 0, 0, 0);

          // 1. Ordenamos por fecha absoluta (timestamp)
          const ordenadas = [...data].sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );

          // 2. Filtramos con una lógica más robusta
          this.ultimasAcciones = ordenadas
            .filter(n => new Date(n.date).getTime() <= hoy.getTime())
            .slice(0, 3);

          this.proximamente = ordenadas
            .filter(n => new Date(n.date).getTime() > hoy.getTime())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // La más cercana primero
            .slice(0, 3);

          console.log('✅ Home - Pasadas:', this.ultimasAcciones.length);
          console.log('✅ Home - Futuras:', this.proximamente.length);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error en Home:', err);
        this.loading = false;
      }
    });
  }

  // Importante limpiar la suscripción al destruir el componente
  ngOnDestroy() {
    if (this.newsSub) {
      this.newsSub.unsubscribe();
    }
  }

  trackByFn(index: number, news: News): number {
    return news.id;
  }
}