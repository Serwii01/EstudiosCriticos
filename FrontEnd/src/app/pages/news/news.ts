import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core'; // <--- 1. Importar ChangeDetectorRef
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

  // <--- 2. Inyectar el detector de cambios
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
    console.log('📰 News cargando...');
    this.newsService.getAllNews().subscribe({
      next: (noticias: News[]) => {
        console.log('✅ Noticias recibidas:', noticias);
        this.noticias = noticias;
        this.loading = false;
        
        // <--- 3. ¡AVISAR A ANGULAR!
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('❌ Error:', err);
        this.loading = false;
        
        // <--- 3. ¡AVISAR A ANGULAR AQUÍ TAMBIÉN!
        this.cdr.detectChanges();
      }
    });
  }
}