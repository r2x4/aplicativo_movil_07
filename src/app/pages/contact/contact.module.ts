import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactPage } from './contact.page';
import { ContactPageRoutingModule } from './contact-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ContactPageRoutingModule
  ],
  declarations: [ContactPage]
})
export class ContactPageModule {}
