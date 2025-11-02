import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
import { Slide } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import { IonIcon, IonButton } from '@ionic/angular/standalone';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, IonButton],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SliderComponent {
  slides: Slide[] = [
    {
      title: 'Innovación Tecnológica',
      subtitle: 'Transformamos tu negocio con soluciones digitales',
      color: 'primary',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800'
    },
    {
      title: 'Experiencia y Calidad',
      subtitle: 'Más de 10 años liderando el mercado tecnológico',
      color: 'success',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800'
    },
    {
      title: 'Soporte 24/7',
      subtitle: 'Estamos contigo en cada paso del camino',
      color: 'warning',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800'
    },
    {
      title: 'Seguridad Informática',
      subtitle: 'Protegemos tus activos digitales con la última tecnología',
      color: 'danger',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800'
    },
    {
      title: 'Análisis de Datos',
      subtitle: 'Convertimos tus datos en decisiones estratégicas',
      color: 'tertiary',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
    }
  ];

  currentIndex = 0;

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  swiperInstance: any;

  onSwiperInit(event: any) {
    this.swiperInstance = event.detail[0];
  }

  onSlideChange(event: any) {
    this.currentIndex = event.detail[0].realIndex;
  }

  goToSlide(index: number) {
    this.swiperInstance?.slideToLoop(index);
  }

  prev() {
    this.swiperInstance?.slidePrev();
  }

  next() {
    this.swiperInstance?.slideNext();
  }
}