import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Skill } from '../components/skills/Skill';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
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
    return this.http.get<Skill[]>(this.apiUrl, httpOptions);
  }
}
