import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './news-detail.html',
  styleUrl: './news-detail.scss'
})
export class NewsDetailComponent implements OnInit, OnDestroy {
  news: News | null = null;
  loading = true;
  error = false;
  private sub?: Subscription;

  constructor(private route: ActivatedRoute, private newsService: NewsService) {}

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!id) { this.error = true; this.loading = false; return; }
      this.newsService.getById(id).subscribe({
        next: (data) => { this.news = data; this.loading = false; },
        error: () => { this.error = true; this.loading = false; }
      });
    });
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }

  getAssemblyName(assembly: string): string {
    const names: { [key: string]: string } = {
      'sevilla': 'Sevilla', 'malaga': 'Málaga', 'granada': 'Granada', 'general': 'General'
    };
    return names[assembly?.toLowerCase()] || assembly;
  }
}
