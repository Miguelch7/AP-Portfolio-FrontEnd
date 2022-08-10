import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Skill } from '../models/Skill';

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

  private apiUrl: string = environment.apiUrl + '/api/skills';

  constructor(
    private http: HttpClient
  ) { }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl);
  }

  createSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.apiUrl, skill, httpOptions);
  }

  updateSkill(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(`${ this.apiUrl }/${ skill.id }`, skill, httpOptions);
  }

  deleteSkill(skill: Skill): Observable<number> {
    return this.http.delete<number>(`${ this.apiUrl }/${ skill.id }`, httpOptions);
  }
}
