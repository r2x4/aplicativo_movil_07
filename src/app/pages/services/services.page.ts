import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { Service } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonButtons,  
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonBackButton,
  IonCardContent,
  IonBadge
} from '@ionic/angular/standalone';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
  standalone: true,
  imports: [CommonModule, FooterComponent, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonBackButton, IonCardContent, IonBadge]
})
export class ServicesPage {
  private servicesService = inject(ServicesService);
  private router = inject(Router);

  services$ = this.servicesService.services$;

  viewServiceDetail(id: number) {
    this.router.navigate(['/service-detail', id]);
  }
}
