import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

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
      // console.log(res);
      localStorage.setItem('auth_token', res.token);
      this.router.navigate(['']);
    });
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  public get isLogged(): boolean {
    return localStorage.getItem('auth_token') !== null;
  }
 }
