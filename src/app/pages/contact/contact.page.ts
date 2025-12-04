import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FooterComponent,
    HttpClientModule,
  ],
})
export class ContactPage {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    subject: ['', Validators.required],
  });

  sendForm() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      const backendUrl = 'http://localhost:3000/api/contact';

      this.http.post(backendUrl, formData).subscribe(
        (response) => {
          console.log('Formulario enviado con éxito', response);
          alert('¡Gracias! Tu mensaje ha sido enviado.');
          this.router.navigate(['/services']);
        },
        (error) => {
          console.error('Error al enviar el formulario', error);
          alert(
            'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.'
          );
        }
      );
    } else {
      alert('Por favor, completa todos los campos del formulario.');
    }
  }
}
