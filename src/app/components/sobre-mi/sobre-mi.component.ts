import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faFileLines, faLocationDot, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { DetalleService } from '../../services/detalle.service';
import { Detalle } from './Detalle';


@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {

  detalle!: Detalle;

  faLocationDot: IconDefinition = faLocationDot;
  faFileLines: IconDefinition = faFileLines;
  iconEdit: IconDefinition = faPenToSquare;

  constructor(
    public authService: AuthService,
    private detalleService: DetalleService
  ) { }

  ngOnInit(): void {
    this.detalleService.getDetalle().subscribe((detalle: Detalle) => {
      this.detalle = detalle;
    });
  }

  updateDetalle(detalle: Detalle): void {
    Swal.fire({
      title: 'Actualizar Detalle',
      html: `
        <div class="form-sweet-alert">
          <div class="form-control">
            <label for="nombre">Nombre: </label>
            <input type="text" id="nombre" class="swal2-input" placeholder="Ingrese el nombre" value="${ detalle.nombre }">
          </div>

          <div class="form-control">
            <label for="apellido">Apellido: </label>
            <input type="text" id="apellido" class="swal2-input" placeholder="Ingrese el apellido" value="${ detalle.apellido }">
          </div>

          <div class="form-control">
            <label for="profesion">Profesión: </label>
            <input type="text" id="profesion" class="swal2-input" placeholder="Ingrese una profesión" value="${ detalle.profesion }">
          </div>

          <div class="form-control">
            <label for="descripcion">Descripción: </label>
            <textarea id="descripcion" class="swal2-input" placeholder="Ingrese una descripcion" row="10">${ detalle.descripcion }</textarea>
          </div>

          <div class="form-control">
            <label for="imagen">URL de la imagen: </label>
            <input type="text" id="imagen" class="swal2-input" placeholder="Ingrese la url de la imagen" value="${ detalle.imagen }">
          </div>

          <div class="form-control">
            <label for="direccion">Dirección: </label>
            <input type="text" id="direccion" class="swal2-input" placeholder="Ingrese una dirección" value="${ detalle.direccion }">
          </div>

          <div class="form-control">
            <label for="cv">URL del cv: </label>
            <input type="text" id="cv" class="swal2-input" placeholder="Ingrese la url del cv" value="${ detalle.cv }">
          </div>
        </ div>
      `,
      width: '60%',
      confirmButtonText: 'Actualizar detalle',
      focusConfirm: false,
      preConfirm: () => {
        const nombre: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#nombre')).value;
        const apellido: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#apellido')).value;
        const profesion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#profesion')).value;
        const descripcion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#descripcion')).value;
        const imagen: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#imagen')).value;
        const direccion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#direccion')).value;
        const cv: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#cv')).value;

        // Validar campos
        if (!nombre || !apellido || !descripcion || !profesion || !direccion || !cv) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        };

        return { nombre, apellido, profesion, descripcion, imagen, direccion, cv };
      }
    }).then((result) => {
      
      const detalleActualizado: Detalle = result.value!;

      if (detalleActualizado) {
        this.detalleService.updateDetalle(detalleActualizado).subscribe((detalle: Detalle) => {
          this.detalle = detalle;
        }, (error) => {
          Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
        });
  
        Swal.fire('El detalle se han actualizado correctamente.', '', 'success');
      };
    }).catch((error) => {
      Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
    });
  }

}
