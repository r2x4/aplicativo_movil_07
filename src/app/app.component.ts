import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet],
})
export class AppComponent {
  public authService = inject(AuthService);
  private router = inject(Router);

  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Servicios',
      url: '/services',
      icon: 'grid'
    },
    {
      title: 'Login Administrador',
      url: '/login',
      icon: 'log-in',
      showWhenNotAuth: true
    },
    {
      title: 'Panel Admin',
      url: '/admin',
      icon: 'settings',
      requiresAuth: true
    }
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  shouldShowMenuItem(page: any): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    
    if (page.requiresAuth && !isAuthenticated) {
      return false;
    }
    
    if (page.showWhenNotAuth && isAuthenticated) {
      return false;
    }
    
    return true;
  }
}