import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})


export class HomeComponent implements OnInit {
  noticias: News[] = [];  // ← News[]
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
  console.log('🚀 Home cargando noticias MySQL...');
  this.newsService.getAllNews().subscribe({  // ← getAllNews()
    next: (noticias: News[]) => {  // ← Tipado News[]
      console.log('✅ MySQL noticias:', noticias);
      this.noticias = noticias.slice(0, 3);  // ← Tus 3 últimas
      this.loading = false;
    },
    error: (err: any) => {
      console.error('❌ Error MySQL:', err);
      this.loading = false;
    }
  });
}

}
