import { Component, OnInit } from '@angular/core';
import { faCirclePlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { ExperienciaService } from '../../services/experiencia.service';
import { Experiencia } from './Experiencia';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experiencias: Experiencia[] = [];
  iconAdd: IconDefinition = faCirclePlus;

  constructor(
    public authService: AuthService,
    private experienciaService: ExperienciaService
  ) {}

  ngOnInit(): void {
    this.experienciaService.getExperiencias().subscribe((experiencias: Experiencia[]) => {
      this.experiencias = experiencias;
    })
  }

  addExperiencia(): void {
    Swal.fire({
      title: 'Añadir Experiencia',
      html: `
        <div class="form-sweet-alert">
          <div class="form-control">
            <label for="puesto">Puesto: </label>
            <input type="text" id="puesto" class="swal2-input" placeholder="Ingrese el nombre del puesto">
          </div>

          <div class="form-control">
            <label for="empresa">Empresa: </label>
            <input type="text" id="empresa" class="swal2-input" placeholder="Ingrese el nombre de la empresa">
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
            <label for="fecha_inicio">Fecha de inicio: </label>
            <input type="text" id="fecha_inicio" class="swal2-input" placeholder="Ingrese una fecha">
          </div>

          <div class="form-control">
            <label for="fecha_fin">Fecha de finalización: </label>
            <input type="text" id="fecha_fin" class="swal2-input" placeholder="Ingrese una fecha">
          </div>
        </ div>
      `,
      width: '60%',
      confirmButtonText: 'Guardar experiencia',
      focusConfirm: false,
      preConfirm: () => {
        const puesto: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#puesto')).value;
        const empresa: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#empresa')).value;
        const descripcion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#descripcion')).value;
        const imagen: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#imagen')).value;
        const fecha_inicio: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#fecha_inicio')).value;
        const fecha_fin: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#fecha_fin')).value;

        // Validar campos
        if (!puesto || !empresa || !descripcion || !fecha_inicio || !fecha_fin) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        };

        const experiencia: Experiencia = { puesto, empresa, descripcion, imagen, fecha_inicio, fecha_fin };

        return experiencia;
      }
    }).then((result) => {
      
      const experiencia: Experiencia = result.value!;

      if (experiencia) {
        this.experienciaService.addExperiencia(experiencia).subscribe((experiencia: Experiencia) => {
          this.experiencias.push(experiencia);
        });
  
        Swal.fire('La experiencia se ha creado correctamente.', '', 'success');
      };
    }).catch((error) => {
      Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
    });
  }

  updateExperiencia(experiencia: Experiencia): void {
    Swal.fire({
      title: 'Actualizar Experiencia',
      html: `
        <div class="form-sweet-alert">
          <div class="form-control">
            <label for="puesto">Puesto: </label>
            <input type="text" id="puesto" class="swal2-input" placeholder="Ingrese el nombre del puesto" value="${ experiencia.puesto }">
          </div>

          <div class="form-control">
            <label for="empresa">Empresa: </label>
            <input type="text" id="empresa" class="swal2-input" placeholder="Ingrese el nombre de la empresa" value="${ experiencia.empresa }">
          </div>

          <div class="form-control">
            <label for="descripcion">Descripción: </label>
            <textarea id="descripcion" class="swal2-input" placeholder="Ingrese una descripcion" row="10">${ experiencia.descripcion }</textarea>
          </div>

          <div class="form-control">
            <label for="imagen">URL de la imagen: </label>
            <input type="text" id="imagen" class="swal2-input" placeholder="Ingrese la url de la imagen" value="${ experiencia.imagen }">
          </div>

          <div class="form-control">
            <label for="fecha_inicio">Fecha de inicio: </label>
            <input type="text" id="fecha_inicio" class="swal2-input" placeholder="Ingrese una fecha" value="${ experiencia.fecha_inicio }">
          </div>

          <div class="form-control">
            <label for="fecha_fin">Fecha de finalización: </label>
            <input type="text" id="fecha_fin" class="swal2-input" placeholder="Ingrese una fecha" value="${ experiencia.fecha_fin }">
          </div>
        </ div>
      `,
      width: '60%',
      confirmButtonText: 'Actualizar experiencia',
      focusConfirm: false,
      preConfirm: () => {
        const puesto: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#puesto')).value;
        const empresa: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#empresa')).value;
        const descripcion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#descripcion')).value;
        const imagen: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#imagen')).value;
        const fecha_inicio: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#fecha_inicio')).value;
        const fecha_fin: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#fecha_fin')).value;

        // Validar campos
        if (!puesto || !empresa || !descripcion || !fecha_inicio || !fecha_fin) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        };

        experiencia = { ...experiencia, puesto, empresa, descripcion, imagen, fecha_inicio, fecha_fin };

        return experiencia;
      }
    }).then((result) => {
      
      const experienciaActualizada: Experiencia = result.value!;

      if (experienciaActualizada) {
        this.experienciaService.updateExperiencia(experienciaActualizada).subscribe((experiencia: Experiencia) => {
          this.experiencias = this.experiencias.map(e => e.id === experiencia.id ? e = experiencia : e);
        });
  
        Swal.fire('La experiencia se ha actualizado correctamente.', '', 'success');
      };
    }).catch((error) => {
      Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
    });
  }

  deleteExperiencia(experiencia: Experiencia): void {

    Swal.fire({
      title: 'Estás seguro que deseas eliminar esta experiencia?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.experienciaService.deleteExperiencia(experiencia).subscribe((id: number) => {
          Swal.fire('La experiencia se ha eliminado correctamente.', '', 'success');
          this.experiencias = this.experiencias.filter(e => e.id !== id);
        });
      };
    });
  }
}
