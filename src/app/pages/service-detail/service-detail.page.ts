import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service = this.servicesService.getServiceById(id);
  }

  async requestService() {
    const alert = await this.alertController.create({
      header: 'Solicitud Enviada',
      message: `Tu solicitud para ${this.service?.name} ha sido enviada correctamente. Nos pondremos en contacto contigo pronto.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
