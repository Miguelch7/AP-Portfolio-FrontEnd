import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Experiencia } from '../components/experiencia/Experiencia';

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

  private apiUrl: string = environment.apiUrl + '/trabajos';

  constructor(
    private http: HttpClient
  ) { }

  getExperiencias(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(this.apiUrl);
  }

  addExperiencia(experiencia: Experiencia): Observable<Experiencia> {
    return this.http.post<Experiencia>(this.apiUrl, experiencia, httpOptions);
  }

  updateExperiencia(experiencia: Experiencia): Observable<Experiencia> {

    const { id, puesto, empresa, descripcion, imagen, fecha_inicio, fecha_fin } = experiencia;

    const params = new HttpParams()
      .set('puesto', puesto)
      .set('empresa', empresa)
      .set('descripcion', descripcion)
      .set('imagen', imagen)
      .set('fecha_inicio', fecha_inicio)
      .set('fecha_fin', fecha_fin);

    return this.http.put<Experiencia>(`${ this.apiUrl }/${ id }`, null , { ...httpOptions, params });
  }

  deleteExperiencia(experiencia: Experiencia): Observable<number> {
    return this.http.delete<number>(`${ this.apiUrl }/${ experiencia.id }`, httpOptions);
  }
}
