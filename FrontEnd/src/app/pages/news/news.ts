import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class NewsComponent implements OnInit {
  noticias: News[] = [];
  loading = true;

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
    console.log('📰 News cargando...');
    this.newsService.getAllNews().subscribe({
      next: (noticias: News[]) => {
        console.log('✅ Noticias:', noticias);
        this.noticias = noticias;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error:', err);
        this.loading = false;
      }
    });
  }
}
