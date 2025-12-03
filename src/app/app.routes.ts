import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.page').then( m => m.ServicesPage)
  },
  {
    path: 'service-detail/:id',
    loadComponent: () => import('./pages/service-detail/service-detail.page').then( m => m.ServiceDetailPage)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.page').then( m => m.ContactPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.page').then( m => m.AdminPage)
  },
];
