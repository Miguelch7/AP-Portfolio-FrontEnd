import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Educacion } from '../components/educacion/Educacion';

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

  private apiUrl: string = environment.apiUrl + '/estudios';

  constructor(
    private http: HttpClient
  ) { }

  getEstudios(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(this.apiUrl);
  }

  addEstudio(estudio: Educacion): Observable<Educacion> {
    return this.http.post<Educacion>(this.apiUrl, estudio, httpOptions);
  }

  updateEstudio(estudio: Educacion): Observable<Educacion> {
    
    const { id, titulo, institucion, descripcion, imagen, fecha_inicio, fecha_fin } = estudio;

    const params = new HttpParams()
      .set('titulo', titulo)
      .set('institucion', institucion)
      .set('descripcion', descripcion)
      .set('imagen', imagen)
      .set('fecha_inicio', fecha_inicio)
      .set('fecha_fin', fecha_fin);

    return this.http.put<Educacion>(`${ this.apiUrl }/${ id }`, null, { ...httpOptions, params });
  }

  deleteEstudio(estudio: Educacion): Observable<number> {
    return this.http.delete<number>(`${ this.apiUrl }/${ estudio.id }`, httpOptions);
  }
}
