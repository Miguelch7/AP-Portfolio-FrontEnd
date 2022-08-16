import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Proyecto } from '../models/Proyecto';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${ localStorage.getItem('auth_token') || '' }`
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private apiUrl: string = environment.apiUrl + '/api/proyectos';

  constructor(
    private http: HttpClient
  ) { }

  getProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl);
  }

  createProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(this.apiUrl, proyecto, httpOptions);
  }

  updateProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.put<Proyecto>(`${ this.apiUrl }/${ proyecto.id }`, proyecto, httpOptions);
  }

  deleteProyecto(proyecto: Proyecto): Observable<number> {
    return this.http.delete<number>(`${ this.apiUrl }/${ proyecto.id }`, httpOptions);
  }
}
