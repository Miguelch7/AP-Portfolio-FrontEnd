import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Detalle } from '../components/sobre-mi/Detalle';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
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
}
