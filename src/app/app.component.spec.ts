import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct menu labels', () => {
    component.appPages = [
      { title: 'Inicio', url: '/home', icon: 'home' },
      { title: 'Servicios', url: '/services', icon: 'grid' },
    ];
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    // We check for more than 0 because the full list depends on auth state
    expect(menuItems.length).toBeGreaterThan(0);
    expect(menuItems[0].textContent).toContain('Inicio');
    expect(menuItems[1].textContent).toContain('Servicios');
  });
});
