import { Component, Input, OnInit } from '@angular/core';
import { Skill } from '../skills/Skill';

@Component({
  selector: 'app-skills-item',
  templateUrl: './skills-item.component.html',
  styleUrls: ['./skills-item.component.css']
})
export class SkillsItemComponent implements OnInit {

  @Input() skill!: Skill;

  constructor() { }

  ngOnInit(): void {
  }

}
