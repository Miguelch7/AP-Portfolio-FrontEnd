import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Skill } from '../components/skills/Skill';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${ localStorage.getItem('auth_token') || '' }`
  })
};

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiUrl: string = environment.apiUrl + '/skills';

  constructor(
    private http: HttpClient
  ) { }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl);
  }

  addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.apiUrl, skill, httpOptions);
  }

  updateSkill(skill: Skill): Observable<Skill> {
    
    const { id, nombre, descripcion, imagen, porcentaje } = skill;

    const params = new HttpParams()
      .set('nombre', nombre)
      .set('descripcion', descripcion)
      .set('imagen', imagen)
      .set('porcentaje', porcentaje);

    return this.http.put<Skill>(`${ this.apiUrl }/${ id }`, null, { ...httpOptions, params });
  }

  deleteSkill(skill: Skill): Observable<number> {
    return this.http.delete<number>(`${ this.apiUrl }/${ skill.id }`, httpOptions);
  }
}
