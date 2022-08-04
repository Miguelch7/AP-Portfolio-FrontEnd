import { Component, OnInit } from '@angular/core';
import { faCirclePlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { EducacionService } from '../../services/educacion.service';
import { Educacion } from './Educacion';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  listadoEducacion: Educacion[] = [];
  iconAdd: IconDefinition = faCirclePlus;

  constructor(
    public authService: AuthService,
    private educacionService: EducacionService
  ) { }

  ngOnInit(): void {
    this.educacionService.getEstudios().subscribe((estudios: Educacion[]) => {
      this.listadoEducacion = estudios;
    });
  }

  addEducacion(): void {
    Swal.fire({
      title: 'Añadir Educación',
      html: `
        <div class="form-sweet-alert">
          <div class="form-control">
            <label for="titulo">Título: </label>
            <input type="text" id="titulo" class="swal2-input" placeholder="Ingrese el nombre del titulo">
          </div>

          <div class="form-control">
            <label for="institucion">Institución: </label>
            <input type="text" id="institucion" class="swal2-input" placeholder="Ingrese el nombre de la institución">
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
      confirmButtonText: 'Guardar educación',
      focusConfirm: false,
      preConfirm: () => {
        const titulo: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#titulo')).value;
        const institucion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#institucion')).value;
        const descripcion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#descripcion')).value;
        const imagen: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#imagen')).value;
        const fecha_inicio: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#fecha_inicio')).value;
        const fecha_fin: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#fecha_fin')).value;

        // Validar campos
        if (!titulo || !institucion || !descripcion || !fecha_inicio || !fecha_fin) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        };

        return { titulo, institucion, descripcion, imagen, fecha_inicio, fecha_fin };
      }
    }).then((result) => {
      
      const educacion: Educacion = result.value!;

      if (educacion) {
        this.educacionService.addEstudio(educacion).subscribe((educacion: Educacion) => {
          this.listadoEducacion.push(educacion);
        });
  
        Swal.fire('El estudio se ha creado correctamente.', '', 'success');
      };
    }).catch((error) => {
      Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
    });
  }

  updateEducacion(educacion: Educacion) {
    Swal.fire({
      title: 'Actualizar Educación',
      html: `
        <div class="form-sweet-alert">
          <div class="form-control">
            <label for="titulo">Título: </label>
            <input type="text" id="titulo" class="swal2-input" placeholder="Ingrese el nombre del titulo" value="${ educacion.titulo }">
          </div>

          <div class="form-control">
            <label for="institucion">Institución: </label>
            <input type="text" id="institucion" class="swal2-input" placeholder="Ingrese el nombre de la institución" value="${ educacion.institucion }">
          </div>

          <div class="form-control">
            <label for="descripcion">Descripción: </label>
            <textarea id="descripcion" class="swal2-input" placeholder="Ingrese una descripcion" row="10">${ educacion.descripcion }</textarea>
          </div>

          <div class="form-control">
            <label for="imagen">URL de la imagen: </label>
            <input type="text" id="imagen" class="swal2-input" placeholder="Ingrese la url de la imagen" value="${ educacion.imagen }">
          </div>

          <div class="form-control">
            <label for="fecha_inicio">Fecha de inicio: </label>
            <input type="text" id="fecha_inicio" class="swal2-input" placeholder="Ingrese una fecha" value="${ educacion.fecha_inicio }">
          </div>

          <div class="form-control">
            <label for="fecha_fin">Fecha de finalización: </label>
            <input type="text" id="fecha_fin" class="swal2-input" placeholder="Ingrese una fecha" value="${ educacion.fecha_fin }">
          </div>
        </ div>
      `,
      width: '60%',
      confirmButtonText: 'Actualizar educación',
      focusConfirm: false,
      preConfirm: () => {
        const titulo: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#titulo')).value;
        const institucion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#institucion')).value;
        const descripcion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#descripcion')).value;
        const imagen: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#imagen')).value;
        const fecha_inicio: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#fecha_inicio')).value;
        const fecha_fin: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#fecha_fin')).value;

        // Validar campos
        if (!titulo || !institucion || !descripcion || !fecha_inicio || !fecha_fin) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        };

        return { ...educacion, titulo, institucion, descripcion, imagen, fecha_inicio, fecha_fin };
      }
    }).then((result) => {
      
      const educacion: Educacion = result.value!;

      if (educacion) {
        this.educacionService.updateEstudio(educacion).subscribe((educacion: Educacion) => {
          this.listadoEducacion = this.listadoEducacion.map(e => e.id === educacion.id ? e = educacion : e);
        });
  
        Swal.fire('El estudio se ha actualizado correctamente.', '', 'success');
      };
    }).catch((error) => {
      Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
    });
  }

  deleteEducacion(educacion: Educacion) {
    Swal.fire({
      title: 'Estás seguro que deseas eliminar este estudio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.educacionService.deleteEstudio(educacion).subscribe((id: number) => {
          Swal.fire('El estudio se ha eliminado correctamente.', '', 'success');
          this.listadoEducacion = this.listadoEducacion.filter(e => e.id !== id);
        })
      }
    })
  }
}
