import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faTrashAlt, faPenToSquare, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Skill } from '../../models/Skill';

@Component({
  selector: 'app-skills-item',
  templateUrl: './skills-item.component.html',
  styleUrls: ['./skills-item.component.css']
})
export class SkillsItemComponent implements OnInit {

  @Input() skill!: Skill;
  @Output() onUpdateSkill: EventEmitter<Skill> = new EventEmitter<Skill>();
  @Output() onDeleteSkill: EventEmitter<Skill> = new EventEmitter<Skill>();
  iconEdit: IconDefinition = faPenToSquare;
  iconDelete: IconDefinition = faTrashAlt;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onUpdate(skill: Skill): void {
    this.onUpdateSkill.emit(skill);
  }

  onDelete(skill: Skill): void {
    this.onDeleteSkill.emit(skill);
  }

}
