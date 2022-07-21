import { Component, OnInit } from '@angular/core';
import { Skill } from './Skill';
import { LISTADO_SKILLS } from './mock-skills';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skills: Skill[] = LISTADO_SKILLS;

  constructor() { }

  ngOnInit(): void {
  }

}
