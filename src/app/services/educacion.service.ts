import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Estudio } from '../models/Estudio';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${ localStorage.getItem('auth_token') || '' }`
  })
};

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  private apiUrl: string = environment.apiUrl + '/api/estudios';

  constructor(
    private http: HttpClient
  ) { }

  getEstudios(): Observable<Estudio[]> {
    return this.http.get<Estudio[]>(this.apiUrl);
  }

  createEstudio(estudio: Estudio): Observable<Estudio> {
    return this.http.post<Estudio>(this.apiUrl, estudio, httpOptions);
  }

  updateEstudio(estudio: Estudio): Observable<Estudio> {
    return this.http.put<Estudio>(`${ this.apiUrl }/${ estudio.id }`, estudio, httpOptions);
  }

  deleteEstudio(estudio: Estudio): Observable<number> {
    return this.http.delete<number>(`${ this.apiUrl }/${ estudio.id }`, httpOptions);
  }
}
