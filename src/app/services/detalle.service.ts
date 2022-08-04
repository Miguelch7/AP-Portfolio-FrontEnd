import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Detalle } from '../components/sobre-mi/Detalle';

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

  private apiUrl: string = environment.apiUrl + '/usuarios/1/detalle';

  constructor(
    private http: HttpClient
  ) { }

  getDetalle(): Observable<Detalle> {
    return this.http.get<Detalle>(this.apiUrl, httpOptions);
  }

  updateDetalle(detalle: Detalle): Observable<Detalle> {
    
    const { nombre, apellido, profesion, descripcion, imagen, direccion, cv } = detalle;

    const params = new HttpParams()
      .set('nombre', nombre)
      .set('apellido', apellido)
      .set('profesion', profesion)
      .set('descripcion', descripcion)
      .set('imagen', imagen)
      .set('direccion', direccion)
      .set('cv', cv);

    return this.http.put<Detalle>(this.apiUrl, null, { ...httpOptions, params });
  }
}
