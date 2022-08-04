import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Proyecto } from '../components/proyectos/Proyecto';

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

  private apiUrl: string = environment.apiUrl + '/proyectos';

  constructor(
    private http: HttpClient
  ) { }

  getProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl);
  }

  addProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(this.apiUrl, proyecto, httpOptions);
  }

  updateProyecto(proyecto: Proyecto): Observable<Proyecto> {
    
    const { id, nombre, descripcion, imagen, link_proyecto, link_repositorio } = proyecto;

    const params = new HttpParams()
      .set('nombre', nombre)
      .set('descripcion', descripcion)
      .set('imagen', imagen)
      .set('link_proyecto', link_proyecto)
      .set('link_repositorio', link_repositorio);

    return this.http.put<Proyecto>(`${ this.apiUrl }/${ id }`, null, { ...httpOptions, params });
  }

  deleteProyecto(proyecto: Proyecto): Observable<number> {
    return this.http.delete<number>(`${ this.apiUrl }/${ proyecto.id }`, httpOptions);
  }
}
