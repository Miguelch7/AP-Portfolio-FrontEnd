import { Component, OnInit } from '@angular/core';
import { faAt, faKey, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  faAt: IconDefinition = faAt;
  faKey: IconDefinition = faKey;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.email.trim() || !this.password.trim()) {
      Swal.fire('Error!', 'Todos los campos son obligatorios', 'error');
      return;
    };

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailRegex.test(this.email)) {
      Swal.fire('Error!', 'Ingrese un email válido', 'error');
      return;
    };

    this.authService.login(this.email, this.password);
  }

}
