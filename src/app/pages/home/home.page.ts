import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonButton
} from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../../components/slider/slider.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, SliderComponent, FooterComponent,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonIcon, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonButton
  ]
})
export class HomePage {
  stats = [
    { number: '500+', label: 'Proyectos Completados', color: 'primary' },
    { number: '250+', label: 'Clientes Satisfechos', color: 'success' },
    { number: '24/7', label: 'Soporte Técnico', color: 'warning' }
  ];

  constructor(private router: Router) {}

  navigateToServices() {
    this.router.navigate(['/services']);
  }
}
