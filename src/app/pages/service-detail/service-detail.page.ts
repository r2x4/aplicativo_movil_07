import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importa Router
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
  service: Service | undefined;

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private router: Router // Inyecta el Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service = this.servicesService.getServiceById(id);
  }

  // Navega a la página de contacto
  requestService() {
    this.router.navigate(['/contact']);
  }
}
