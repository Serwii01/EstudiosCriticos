import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutUsComponent } from './pages/about-us/about-us';
import { NewsComponent } from './pages/news/news';
import { NewsDetailComponent } from './pages/news-detail/news-detail';
import { AdminComponent } from './pages/admin/admin';
import { TerritoriosComponent } from './pages/territorios/territorios';
import { ContactoComponent } from './pages/contacto/contacto';
import { AfiliateComponent } from './pages/afiliate/afiliate';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'conocenos', component: AboutUsComponent },
  { path: 'noticias', component: NewsComponent },
  { path: 'noticias/:id', component: NewsDetailComponent },
  { path: 'territorios', component: TerritoriosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'afiliate', component: AfiliateComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }
];
