import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Service } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private servicesSubject = new BehaviorSubject<Service[]>([]);
  services$ = this.servicesSubject.asObservable();

  private services: Service[] = [
    {
      id: 1,
      name: 'Desarrollo Web',
      description: 'Creación de sitios y aplicaciones web a medida.',
      price: 4500000,
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400',
      quantity: 10,
      onPromotion: true
    },
    {
      id: 2,
      name: 'Desarrollo Móvil',
      description: 'Aplicaciones nativas e híbridas para iOS y Android.',
      price: 5500000,
      image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400',
      quantity: 8,
      onPromotion: false
    },
    {
      id: 3,
      name: 'Consultoría TI',
      description: 'Asesoramiento estratégico para optimizar tu infraestructura tecnológica.',
      price: 3000000,
      image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400',
      quantity: 15,
      onPromotion: true
    },
    {
      id: 4,
      name: 'Soporte Técnico',
      description: 'Soporte 24/7 para resolver cualquier incidencia.',
      price: 1800000, // Precio ajustado para el ejemplo
      image: 'https://images.unsplash.com/photo-1558021211-651409115993?w=400',
      quantity: 20,
      onPromotion: false
    }
  ];

  constructor() {
    this.servicesSubject.next(this.services);
  }

  getServiceById(id: number): Service | undefined {
    return this.services.find(s => s.id === id);
  }

  createService(serviceData: Omit<Service, 'id'>) {
    const newId = this.services.length > 0 ? Math.max(...this.services.map(s => s.id)) + 1 : 1;
    const newService: Service = { id: newId, ...serviceData };
    this.services.push(newService);
    this.servicesSubject.next([...this.services]);
  }

  updateService(updatedService: Service) {
    const index = this.services.findIndex(s => s.id === updatedService.id);
    if (index !== -1) {
      this.services[index] = updatedService;
      this.servicesSubject.next([...this.services]);
    }
  }

  deleteService(id: number) {
    const index = this.services.findIndex(s => s.id === id);
    if (index !== -1) {
      this.services.splice(index, 1);
      this.servicesSubject.next([...this.services]);
    }
  }
}
