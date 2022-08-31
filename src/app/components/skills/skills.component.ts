import { Component, OnInit } from '@angular/core';
import { faCirclePlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { SkillService } from '../../services/skill.service';
import { Skill } from '../../models/Skill';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skills: Skill[] = [];
  showAddSkill: boolean = false;
  showUpdateSkill: boolean = false;
  skillSeleccionada!: Skill;
  iconAdd: IconDefinition = faCirclePlus;

  constructor(
    public authService: AuthService,
    private skillService: SkillService
  ) { }

  ngOnInit(): void {
    this.skillService.getSkills().subscribe((skills: Skill[]) => {
      this.skills = skills;
    });
  }

  toogleAddSkill(): void {
    this.showAddSkill = !this.showAddSkill;
    this.showUpdateSkill = false;
  }

  toogleUpdateSkill(skill: Skill): void {
    this.showAddSkill = false;
    this.skillSeleccionada = skill;
    this.showUpdateSkill = !this.showUpdateSkill;
  }

  addSkill(skill: Skill): void {
    this.showAddSkill = false;
    this.skillService.createSkill(skill).subscribe((skill: Skill) => {
      this.skills.push(skill);
    });

    Swal.fire('La skill se ha creado correctamente.', '', 'success');    
  }

  updateSkill(skill: Skill) {
    this.showUpdateSkill = false;
    this.skillService.updateSkill(skill).subscribe((skill: Skill) => {
      this.skills = this.skills.map(s => s.id === skill.id ? s = skill : s);
    });

    Swal.fire('La skill se ha actualizado correctamente.', '', 'success');
  }

  deleteSkill(skill: Skill): void {

    Swal.fire({
      title: 'Estás seguro que deseas eliminar esta skill?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.skillService.deleteSkill(skill).subscribe((id: number) => {
          Swal.fire('La skill se ha eliminado correctamente.', '', 'success');
          this.skills = this.skills.filter(s => s.id !== id);
        });
      };
    });
  }
}
