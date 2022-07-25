import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Educacion } from '../components/educacion/Educacion';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
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
    return this.http.get<Educacion[]>(this.apiUrl, httpOptions);
  }
}
