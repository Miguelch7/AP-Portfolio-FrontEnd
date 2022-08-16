import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DetalleUsuario } from '../models/DetalleUsuario';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${ localStorage.getItem('auth_token') || '' }`
  })
};

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  private apiUrl: string = environment.apiUrl + '/api/usuarios/1/detalle';

  constructor(
    private http: HttpClient
  ) { }

  getDetalleUsuario(): Observable<DetalleUsuario> {
    return this.http.get<DetalleUsuario>(this.apiUrl);
  }

  updateDetalleUsuario(detalleUsuario: DetalleUsuario): Observable<DetalleUsuario> {
    return this.http.put<DetalleUsuario>(this.apiUrl, detalleUsuario, httpOptions);
  }
}
