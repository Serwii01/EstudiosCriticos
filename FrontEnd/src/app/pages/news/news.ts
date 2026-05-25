import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class NewsComponent implements OnInit {
  noticias: News[] = [];
  noticiasFiltradas: News[] = [];
  loading = true;
  filtroAsamblea = '';
  busqueda = '';

  constructor(private newsService: NewsService) {}

  trackByFn(index: number, news: News): number { return news.id; }

  getAssemblyName(assembly: string): string {
    const names: { [key: string]: string } = {
      'sevilla': 'Sevilla', 'malaga': 'Málaga', 'granada': 'Granada', 'general': 'General'
    };
    return names[assembly?.toLowerCase()] || assembly;
  }

  ngOnInit() {
    this.newsService.getAllNews().subscribe({
      next: (noticias: News[]) => {
        this.noticias = noticias;
        this.aplicarFiltros();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSearch(value: string) {
    this.busqueda = value;
    this.aplicarFiltros();
  }

  filtrarPor(asamblea: string) {
    this.filtroAsamblea = asamblea;
    this.aplicarFiltros();
  }

  private aplicarFiltros() {
    this.noticiasFiltradas = this.noticias.filter(n => {
      const coincideAsamblea = !this.filtroAsamblea ||
        n.assembly?.toLowerCase() === this.filtroAsamblea.toLowerCase();
      const coincideBusqueda = !this.busqueda ||
        n.title.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        n.description?.toLowerCase().includes(this.busqueda.toLowerCase());
      return coincideAsamblea && coincideBusqueda;
    });
  }
}
