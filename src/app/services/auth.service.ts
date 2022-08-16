import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrl + '/api/auth/login';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(email: string, password: string): void {
    this.http.post(this.apiUrl, { email, password }).subscribe((res: any) => {
      localStorage.setItem('auth_token', res.token);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Inicio de sesión éxitoso',
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['']);
    }, () => {
      Swal.fire('Error!', 'Email y/o password incorrecto', 'error');
    });
  }

  logout() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cierre de sesión éxitoso',
      showConfirmButton: false,
      timer: 2000
    });
    localStorage.removeItem('auth_token');
  }

  public get isLogged(): boolean {
    return localStorage.getItem('auth_token') !== null;
  }
 }
