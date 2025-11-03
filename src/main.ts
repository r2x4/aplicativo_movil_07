import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';

import { addIcons } from 'ionicons';
import { 
  home, 
  grid, 
  logIn, 
  settings, 
  logOut, 
  briefcase, 
  chevronBackOutline, 
  chevronForwardOutline, 
  mailOutline, 
  callOutline, 
  locationOutline,
  briefcaseOutline,
  gridOutline
} from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

register();

addIcons({
  home,
  grid,
  logIn,
  settings,
  logOut,
  briefcase,
  chevronBackOutline,
  chevronForwardOutline,
  mailOutline,
  callOutline,
  locationOutline,
  briefcaseOutline,
  gridOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
