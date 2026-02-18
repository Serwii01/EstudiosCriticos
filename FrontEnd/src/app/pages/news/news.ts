import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // <--- 1. Importar MatIconModule
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, MatIconModule], // <--- 2. Añadir MatIconModule a los imports
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class NewsComponent implements OnInit {
  noticias: News[] = [];
  loading = true;
  private cdr = inject(ChangeDetectorRef);

  constructor(private newsService: NewsService) {}

  trackByFn(index: number, news: News): number {
    return news.id;
  }

  getAssemblyName(assembly: string): string {
    const names: { [key: string]: string } = {
      'sevilla': 'Sevilla',
      'malaga': 'Málaga',
      'general': 'General'
    };
    return names[assembly] || assembly;
  }

  ngOnInit() {
    this.newsService.getAllNews().subscribe({
      next: (noticias: News[]) => {
        this.noticias = noticias;
        this.loading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('❌ Error:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}