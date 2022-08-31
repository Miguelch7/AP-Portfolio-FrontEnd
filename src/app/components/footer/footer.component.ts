import { Component, OnInit } from '@angular/core';
import { faAt, faUser, faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faGithub, IconDefinition as IconDefinitionBrands } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  nombre: string = '';
  email: string = '';
  mensaje: string = '';

  year: number = new Date().getFullYear();

  faAt: IconDefinition = faAt;
  faUser: IconDefinition = faUser;
  faLinkedinIn: IconDefinitionBrands = faLinkedinIn;
  faGithub: IconDefinitionBrands = faGithub;
  faEnvelope: IconDefinition = faEnvelope;

  constructor(
    private emailService: EmailService
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    if (!this.nombre.trim() || !this.email.trim() || !this.mensaje.trim()) {
      Swal.fire({
        title: 'Error!',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonColor: 'var(--green)'
      });
      return;
    };

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailRegex.test(this.email)) {
      Swal.fire('Error!', 'Ingrese un email válido', 'error');
      return;
    };

    this.nombre = '';
    this.email = '';
    this.mensaje = '';

    Swal.fire({
      position: 'top-end',
      text: 'Enviando email...',
      iconHtml: `
        <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      `,
      showConfirmButton: false,
      timer: 5000
    });

    this.emailService.sendEmail(this.nombre, this.email, this.mensaje).subscribe((res: boolean) => {
      if (res) {
        Swal.fire('Éxito!', 'El email ha sido enviado con éxito', 'success');  
      } else {
        Swal.fire('Error!', 'No se ha podido enviar el email', 'error');
      }
    }, () => {
      Swal.fire('Error!', 'Ha ocurrido un error, inténtelo más tarde.', 'error');
    });
  }
    

}
