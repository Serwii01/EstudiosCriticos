import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
