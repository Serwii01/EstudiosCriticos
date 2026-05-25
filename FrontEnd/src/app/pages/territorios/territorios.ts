import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AssemblyService } from '../../services/assembly.service';
import { Assembly } from '../../models/assembly.model';

@Component({
  selector: 'app-territorios',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './territorios.html',
  styleUrl: './territorios.scss'
})
export class TerritoriosComponent implements OnInit {
  assemblies: Assembly[] = [];
  filtered: Assembly[] = [];
  loading = true;
  search = '';

  constructor(private assemblyService: AssemblyService) {}

  ngOnInit() {
    this.assemblyService.getAll().subscribe({
      next: (data) => {
        this.assemblies = data;
        this.filtered = data;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  onSearch(value: string) {
    this.search = value;
    this.filtered = this.assemblies.filter(a =>
      a.ciudad.toLowerCase().includes(value.toLowerCase())
    );
  }

  getEmailSlug(ciudad: string): string {
    return ciudad.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/\s+/g, '');
  }
}
