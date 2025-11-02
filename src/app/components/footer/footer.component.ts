import { Component } from '@angular/core';
import { IonFooter, IonGrid, IonRow, IonCol, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [IonFooter, IonGrid, IonRow, IonCol, IonIcon]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
