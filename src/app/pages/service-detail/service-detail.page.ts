import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { Service } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonBadge,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.page.html',
  styleUrls: ['./service-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, FooterComponent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardContent, IonButton, IonBadge, IonIcon, IonGrid, IonRow, IonCol]
})
export class ServiceDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private servicesService = inject(ServicesService);
  private router = inject(Router);

  service: Service | undefined;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service = this.servicesService.getServiceById(id);
  }

  requestService() {
    this.router.navigate(['/contact']);
  }
}
