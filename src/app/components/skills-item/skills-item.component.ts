import { Component, Input, OnInit } from '@angular/core';
import { Skill } from '../skills/Skill';
import { LISTADO_SKILLS } from '../skills/mock-skills';

@Component({
  selector: 'app-skills-item',
  templateUrl: './skills-item.component.html',
  styleUrls: ['./skills-item.component.css']
})
export class SkillsItemComponent implements OnInit {

  @Input() skill: Skill = LISTADO_SKILLS[0];

  constructor() { }

  ngOnInit(): void {
  }

}
