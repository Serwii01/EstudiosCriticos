import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutUsComponent } from './pages/about-us/about-us';
import { NewsComponent} from './pages/news/news'
import { AdminComponent } from './pages/admin/admin';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'conocenos', component: AboutUsComponent },
  { path: 'noticias', component: NewsComponent},
  { path: 'admin', component: AdminComponent},
  { path: '**', redirectTo: '' }
];