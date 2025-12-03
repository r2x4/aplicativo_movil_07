import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
export class ContactPage implements OnInit {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
    });
  }

  ngOnInit() {}

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
