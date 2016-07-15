import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'user/login', component: LoginComponent },
  { path: 'user/signup', component: RegisterComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
