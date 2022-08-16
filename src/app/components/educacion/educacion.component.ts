import { Component, OnInit } from '@angular/core';
import { faCirclePlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { EducacionService } from '../../services/educacion.service';
import { Estudio } from '../../models/Estudio';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  listadoEstudios: Estudio[] = [];
  iconAdd: IconDefinition = faCirclePlus;

  constructor(
    public authService: AuthService,
    private educacionService: EducacionService
  ) { }

  ngOnInit(): void {
    this.educacionService.getEstudios().subscribe((estudios: Estudio[]) => {
      this.listadoEstudios = estudios;
    });
  }

  createEstudio(): void {
    Swal.fire({
      title: 'Añadir Estudio',
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
      confirmButtonText: 'Guardar estudio',
      focusConfirm: false,
      preConfirm: () => {
        const titulo: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#titulo')).value;
        const institucion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#institucion')).value;
        const descripcion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#descripcion')).value;
        const imagen: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#imagen')).value;
        const fechaInicio: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#fecha_inicio')).value;
        const fechaFin: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#fecha_fin')).value;

        // Validar campos
        if (!titulo || !institucion || !descripcion || !fechaInicio || !fechaFin) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        };

        return { titulo, institucion, descripcion, imagen, fechaInicio, fechaFin };
      }
    }).then((result) => {
      
      const estudio: Estudio = result.value!;

      if (estudio) {
        this.educacionService.createEstudio(estudio).subscribe((estudio: Estudio) => {
          this.listadoEstudios.push(estudio);
        });
  
        Swal.fire('El estudio se ha creado correctamente.', '', 'success');
      };
    }).catch((error) => {
      Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
    });
  }

  updateEstudio(estudio: Estudio) {
    Swal.fire({
      title: 'Actualizar Estudio',
      html: `
        <div class="form-sweet-alert">
          <div class="form-control">
            <label for="titulo">Título: </label>
            <input type="text" id="titulo" class="swal2-input" placeholder="Ingrese el nombre del titulo" value="${ estudio.titulo }">
          </div>

          <div class="form-control">
            <label for="institucion">Institución: </label>
            <input type="text" id="institucion" class="swal2-input" placeholder="Ingrese el nombre de la institución" value="${ estudio.institucion }">
          </div>

          <div class="form-control">
            <label for="descripcion">Descripción: </label>
            <textarea id="descripcion" class="swal2-input" placeholder="Ingrese una descripcion" row="10">${ estudio.descripcion }</textarea>
          </div>

          <div class="form-control">
            <label for="imagen">URL de la imagen: </label>
            <input type="text" id="imagen" class="swal2-input" placeholder="Ingrese la url de la imagen" value="${ estudio.imagen }">
          </div>

          <div class="form-control">
            <label for="fecha_inicio">Fecha de inicio: </label>
            <input type="text" id="fecha_inicio" class="swal2-input" placeholder="Ingrese una fecha" value="${ estudio.fechaInicio }">
          </div>

          <div class="form-control">
            <label for="fecha_fin">Fecha de finalización: </label>
            <input type="text" id="fecha_fin" class="swal2-input" placeholder="Ingrese una fecha" value="${ estudio.fechaFin }">
          </div>
        </ div>
      `,
      width: '60%',
      confirmButtonText: 'Actualizar estudio',
      focusConfirm: false,
      preConfirm: () => {
        const titulo: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#titulo')).value;
        const institucion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#institucion')).value;
        const descripcion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#descripcion')).value;
        const imagen: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#imagen')).value;
        const fechaInicio: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#fecha_inicio')).value;
        const fechaFin: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#fecha_fin')).value;

        // Validar campos
        if (!titulo || !institucion || !descripcion || !fechaInicio || !fechaFin) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        };

        return { ...estudio, titulo, institucion, descripcion, imagen, fechaInicio, fechaFin };
      }
    }).then((result) => {
      
      const estudio: Estudio = result.value!;

      if (estudio) {
        this.educacionService.updateEstudio(estudio).subscribe((estudio: Estudio) => {
          this.listadoEstudios = this.listadoEstudios.map(e => e.id === estudio.id ? e = estudio : e);
        });
  
        Swal.fire('El estudio se ha actualizado correctamente.', '', 'success');
      };
    }).catch((error) => {
      Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
    });
  }

  deleteEstudio(estudio: Estudio) {
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
        this.educacionService.deleteEstudio(estudio).subscribe((id: number) => {
          Swal.fire('El estudio se ha eliminado correctamente.', '', 'success');
          this.listadoEstudios = this.listadoEstudios.filter(e => e.id !== id);
        })
      }
    })
  }
}
