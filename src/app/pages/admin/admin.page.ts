import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicesService } from '../../services/services.service';
import { AuthService } from '../../services/auth.service';
import { Service } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonCol,
  IonBadge
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton, IonIcon, IonContent, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonCol, IonBadge]
})
export class AdminPage implements OnInit {
  private servicesService = inject(ServicesService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private alertController = inject(AlertController);

  services: Service[] = [];
  isEditing = false;
  editingService: Service | null = null;
  
  formData: Partial<Service> = {
    name: '',
    description: '',
    price: 1000000,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400',
    quantity: 0,
    onPromotion: false
  };

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadServices();
  }

  loadServices() {
    this.servicesService.services$.subscribe(services => {
      this.services = services;
    });
  }

  createService() {
    this.isEditing = true;
    this.editingService = null;
    this.formData = {
      name: '',
      description: '',
      price: 1000000,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400',
      quantity: 0,
      onPromotion: false
    };
  }

  editService(service: Service) {
    this.isEditing = true;
    this.editingService = service;
    this.formData = { ...service };
  }

  async saveService() {
    if (!this.formData.name || !this.formData.price) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor completa todos los campos obligatorios',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.editingService) {
      this.servicesService.updateService({
        ...this.editingService,
        ...this.formData
      } as Service);
    } else {
      this.servicesService.createService(this.formData as Omit<Service, 'id'>);
    }

    this.cancelEdit();
    
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Servicio guardado correctamente',
      buttons: ['OK']
    });
    await alert.present();
  }

  async deleteService(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de eliminar este servicio?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.servicesService.deleteService(id);
          }
        }
      ]
    });
    await alert.present();
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingService = null;
    this.formData = {
      name: '',
      description: '',
      price: 1000000,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400',
      quantity: 0,
      onPromotion: false
    };
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salir',
          handler: () => {
            this.authService.logout();
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
  }
}
