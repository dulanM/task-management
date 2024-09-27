import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.route').then(m => m.AUTH_ROUTES),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.route').then(m => m.HOME_ROUTES),
    canActivate: [AuthGuard], // Protect the "home" route
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth' },
];
