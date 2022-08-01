import { Component, OnInit } from '@angular/core';
import { Skill } from './Skill';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skills: Skill[] = [];

  constructor(
    private skillService: SkillService
  ) { }

  ngOnInit(): void {
    this.skillService.getSkills().subscribe((skills: Skill[]) => {
      this.skills = skills;
    });
  }

}
