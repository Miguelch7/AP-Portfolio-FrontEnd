import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Trabajo } from '../models/Trabajo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${ localStorage.getItem('auth_token') || '' }`
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  private apiUrl: string = environment.apiUrl + '/api/trabajos';

  constructor(
    private http: HttpClient
  ) { }

  getTrabajos(): Observable<Trabajo[]> {
    return this.http.get<Trabajo[]>(this.apiUrl);
  }

  createTrabajo(trabajo: Trabajo): Observable<Trabajo> {
    return this.http.post<Trabajo>(this.apiUrl, trabajo, httpOptions);
  }

  updateTrabajo(trabajo: Trabajo): Observable<Trabajo> {
    return this.http.put<Trabajo>(`${ this.apiUrl }/${ trabajo.id }`, trabajo , httpOptions);
  }

  deleteTrabajo(trabajo: Trabajo): Observable<number> {
    return this.http.delete<number>(`${ this.apiUrl }/${ trabajo.id }`, httpOptions);
  }
}
