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

  createSkill(): void {
    Swal.fire({
      title: 'Añadir Skill',
      html: `
        <div class="form-sweet-alert">
          <div class="form-control">
            <label for="nombre">Nombre: </label>
            <input type="text" id="nombre" class="swal2-input" placeholder="Ingrese el nombre de la skill">
          </div>

          <div class="form-control">
            <label for="descripcion">Descripción: </label>
            <textarea id="descripcion" class="swal2-input" placeholder="Ingrese una descripcion" row="10"></textarea>
          </div>

          <div class="form-control">
            <label for="imagen">URL de la imagen: </label>
            <input type="text" id="imagen" class="swal2-input" placeholder="Ingrese la url de la imagen">
          </div>

          <div class="form-control">
            <label for="porcentaje">Porcentaje: </label>
            <input type="number" id="porcentaje" class="swal2-input" placeholder="Ingrese un porcentaje">
          </div>
        </ div>
      `,
      width: '60%',
      confirmButtonText: 'Guardar skill',
      focusConfirm: false,
      preConfirm: () => {
        const nombre: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#nombre')).value;
        const descripcion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#descripcion')).value;
        const imagen: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#imagen')).value;
        const porcentajeString: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#porcentaje')).value;

        // Validar campos
        if (!nombre || !imagen || !porcentajeString) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        };

        const porcentaje: number = parseInt(porcentajeString);

        return { nombre, descripcion, imagen, porcentaje };
      }
    }).then((result) => {
      
      const skill: Skill = result.value!;

      if (skill) {
        this.skillService.createSkill(skill).subscribe((skill: Skill) => {
          this.skills.push(skill);
        });
  
        Swal.fire('La skill se ha creado correctamente.', '', 'success');
      };
    }).catch((error) => {
      Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
    });
  }

  updateSkill(skill: Skill) {
    Swal.fire({
      title: 'Actualizar Skill',
      html: `
        <div class="form-sweet-alert">
          <div class="form-control">
            <label for="nombre">Nombre: </label>
            <input type="text" id="nombre" class="swal2-input" placeholder="Ingrese el nombre de la skill" value="${ skill.nombre }">
          </div>

          <div class="form-control">
            <label for="descripcion">Descripción: </label>
            <textarea id="descripcion" class="swal2-input" placeholder="Ingrese una descripcion" row="10">${ skill.descripcion }</textarea>
          </div>

          <div class="form-control">
            <label for="imagen">URL de la imagen: </label>
            <input type="text" id="imagen" class="swal2-input" placeholder="Ingrese la url de la imagen" value="${ skill.imagen }">
          </div>

          <div class="form-control">
            <label for="porcentaje">Porcentaje: </label>
            <input type="number" id="porcentaje" class="swal2-input" placeholder="Ingrese un porcentaje" value="${ skill.porcentaje }">
          </div>
        </ div>
      `,
      width: '60%',
      confirmButtonText: 'Actualizar skill',
      focusConfirm: false,
      preConfirm: () => {
        const nombre: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#nombre')).value;
        const descripcion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#descripcion')).value;
        const imagen: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#imagen')).value;
        const porcentajeString: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#porcentaje')).value;

        // Validar campos
        if (!nombre || !imagen || !porcentajeString) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        };

        const porcentaje: number = parseInt(porcentajeString);

        return { ...skill, nombre, descripcion, imagen, porcentaje };
      }
    }).then((result) => {
      
      const skillActualizada: Skill = result.value!;

      if (skillActualizada) {
        this.skillService.updateSkill(skillActualizada).subscribe((skill: Skill) => {
          this.skills = this.skills.map(s => s.id === skill.id ? s = skill : s);
        });
  
        Swal.fire('La skill se ha actualizado correctamente.', '', 'success');
      };
    }).catch((error) => {
      Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
    });
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
