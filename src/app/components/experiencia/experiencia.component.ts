import { Component, OnInit } from '@angular/core';
import { faCirclePlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { ExperienciaService } from '../../services/experiencia.service';
import { Trabajo } from '../../models/Trabajo';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  trabajos: Trabajo[] = [];
  iconAdd: IconDefinition = faCirclePlus;

  constructor(
    public authService: AuthService,
    private experienciaService: ExperienciaService
  ) {}

  ngOnInit(): void {
    this.experienciaService.getTrabajos().subscribe((trabajos: Trabajo[]) => {
      this.trabajos = trabajos;
    })
  }

  createTrabajo(): void {
    Swal.fire({
      title: 'Añadir Trabajo',
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
      confirmButtonText: 'Guardar trabajo',
      focusConfirm: false,
      preConfirm: () => {
        const puesto: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#puesto')).value;
        const empresa: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#empresa')).value;
        const descripcion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#descripcion')).value;
        const imagen: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#imagen')).value;
        const fechaInicio: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#fecha_inicio')).value;
        const fechaFin: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#fecha_fin')).value;

        // Validar campos
        if (!puesto || !empresa || !descripcion || !fechaInicio || !fechaFin) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        };

        return { puesto, empresa, descripcion, imagen, fechaInicio, fechaFin };
      }
    }).then((result) => {
      
      const trabajo: Trabajo = result.value!;

      if (trabajo) {
        this.experienciaService.createTrabajo(trabajo).subscribe((trabajo: Trabajo) => {
          this.trabajos.push(trabajo);
        });
  
        Swal.fire('El trabajo se ha creado correctamente.', '', 'success');
      };
    }).catch((error) => {
      Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
    });
  }

  updateTrabajo(trabajo: Trabajo): void {
    Swal.fire({
      title: 'Actualizar Trabajo',
      html: `
        <div class="form-sweet-alert">
          <div class="form-control">
            <label for="puesto">Puesto: </label>
            <input type="text" id="puesto" class="swal2-input" placeholder="Ingrese el nombre del puesto" value="${ trabajo.puesto }">
          </div>

          <div class="form-control">
            <label for="empresa">Empresa: </label>
            <input type="text" id="empresa" class="swal2-input" placeholder="Ingrese el nombre de la empresa" value="${ trabajo.empresa }">
          </div>

          <div class="form-control">
            <label for="descripcion">Descripción: </label>
            <textarea id="descripcion" class="swal2-input" placeholder="Ingrese una descripcion" row="10">${ trabajo.descripcion }</textarea>
          </div>

          <div class="form-control">
            <label for="imagen">URL de la imagen: </label>
            <input type="text" id="imagen" class="swal2-input" placeholder="Ingrese la url de la imagen" value="${ trabajo.imagen }">
          </div>

          <div class="form-control">
            <label for="fecha_inicio">Fecha de inicio: </label>
            <input type="text" id="fecha_inicio" class="swal2-input" placeholder="Ingrese una fecha" value="${ trabajo.fechaInicio }">
          </div>

          <div class="form-control">
            <label for="fecha_fin">Fecha de finalización: </label>
            <input type="text" id="fecha_fin" class="swal2-input" placeholder="Ingrese una fecha" value="${ trabajo.fechaFin }">
          </div>
        </ div>
      `,
      width: '60%',
      confirmButtonText: 'Actualizar trabajo',
      focusConfirm: false,
      preConfirm: () => {
        const puesto: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#puesto')).value;
        const empresa: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#empresa')).value;
        const descripcion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#descripcion')).value;
        const imagen: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#imagen')).value;
        const fechaInicio: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#fecha_inicio')).value;
        const fechaFin: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#fecha_fin')).value;

        // Validar campos
        if (!puesto || !empresa || !descripcion || !fechaInicio || !fechaFin) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        };

        return { ...trabajo, puesto, empresa, descripcion, imagen, fechaInicio, fechaFin };
      }
    }).then((result) => {
      
      const trabajoActualizado: Trabajo = result.value!;

      if (trabajoActualizado) {
        this.experienciaService.updateTrabajo(trabajoActualizado).subscribe((trabajo: Trabajo) => {
          this.trabajos = this.trabajos.map(t => t.id === trabajo.id ? t = trabajo : t);
        });
  
        Swal.fire('El trabajo se ha actualizado correctamente.', '', 'success');
      };
    }).catch((error) => {
      Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
    });
  }

  deleteTrabajo(trabajo: Trabajo): void {

    Swal.fire({
      title: 'Estás seguro que deseas eliminar este trabajo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.experienciaService.deleteTrabajo(trabajo).subscribe((id: number) => {
          Swal.fire('El trabajo se ha eliminado correctamente.', '', 'success');
          this.trabajos = this.trabajos.filter(t => t.id !== id);
        });
      };
    });
  }
}
