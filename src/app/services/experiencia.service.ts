import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Experiencia } from '../components/experiencia/Experiencia';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  private apiUrl: string = environment.apiUrl + '/trabajos';

  constructor(
    private http: HttpClient
  ) { }

  getTrabajos(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(this.apiUrl, httpOptions);
  }
}
