import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
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
export class SliderComponent implements OnInit, OnDestroy {
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
    }
  ];

  currentIndex = 0;
  private intervalId: any;

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  ngOnInit() {
    this.startAutoplay();
    this.swiperRef?.nativeElement.swiper.on('slideChange', () => {
      this.currentIndex = this.swiperRef?.nativeElement.swiper.realIndex;
    });
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    this.intervalId = setInterval(() => {
      this.swiperRef?.nativeElement.swiper.slideNext();
    }, 5000);
  }

  stopAutoplay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  goToSlide(index: number) {
    this.swiperRef?.nativeElement.swiper.slideTo(index);
  }

  prev() {
    this.swiperRef?.nativeElement.swiper.slidePrev();
  }

  next() {
    this.swiperRef?.nativeElement.swiper.slideNext();
  }
}