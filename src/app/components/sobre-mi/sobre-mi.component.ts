import { Component, OnInit } from '@angular/core';
import { faPenToSquare, faFileLines, faLocationDot, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { DetalleService } from '../../services/detalle.service';
import { DetalleUsuario } from '../../models/DetalleUsuario';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {

  detalleUsuario!: DetalleUsuario;

  faLocationDot: IconDefinition = faLocationDot;
  faFileLines: IconDefinition = faFileLines;
  iconEdit: IconDefinition = faPenToSquare;

  constructor(
    public authService: AuthService,
    private detalleService: DetalleService
  ) { }

  ngOnInit(): void {
    this.detalleService.getDetalleUsuario().subscribe((detalleUsuario: DetalleUsuario) => {
      this.detalleUsuario = detalleUsuario;
    });
  }

  updateDetalleUsuario(detalleUsuario: DetalleUsuario): void {
    Swal.fire({
      title: 'Actualizar Detalle',
      html: `
        <div class="form-sweet-alert">
          <div class="form-control">
            <label for="nombre">Nombre: </label>
            <input type="text" id="nombre" class="swal2-input" placeholder="Ingrese el nombre" value="${ detalleUsuario.nombre }">
          </div>

          <div class="form-control">
            <label for="apellido">Apellido: </label>
            <input type="text" id="apellido" class="swal2-input" placeholder="Ingrese el apellido" value="${ detalleUsuario.apellido }">
          </div>

          <div class="form-control">
            <label for="profesion">Profesión: </label>
            <input type="text" id="profesion" class="swal2-input" placeholder="Ingrese una profesión" value="${ detalleUsuario.profesion }">
          </div>

          <div class="form-control">
            <label for="descripcion">Descripción: </label>
            <textarea id="descripcion" class="swal2-input" placeholder="Ingrese una descripcion" row="10">${ detalleUsuario.descripcion }</textarea>
          </div>

          <div class="form-control">
            <label for="imagen">URL de la imagen: </label>
            <input type="text" id="imagen" class="swal2-input" placeholder="Ingrese la url de la imagen" value="${ detalleUsuario.imagen }">
          </div>

          <div class="form-control">
            <label for="direccion">Dirección: </label>
            <input type="text" id="direccion" class="swal2-input" placeholder="Ingrese una dirección" value="${ detalleUsuario.direccion }">
          </div>

          <div class="form-control">
            <label for="cv">URL del cv: </label>
            <input type="text" id="cv" class="swal2-input" placeholder="Ingrese la url del cv" value="${ detalleUsuario.linkCv }">
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
        const linkCv: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#cv')).value;

        // Validar campos
        if (!nombre || !apellido || !descripcion || !profesion || !direccion || !linkCv) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        };

        return { nombre, apellido, profesion, descripcion, imagen, direccion, linkCv };
      }
    }).then((result) => {
      
      const detalleusuarioActualizado: DetalleUsuario = result.value!;

      if (detalleusuarioActualizado) {
        this.detalleService.updateDetalleUsuario(detalleusuarioActualizado).subscribe((detalleUsuario: DetalleUsuario) => {
          this.detalleUsuario = detalleUsuario;
        }, (error) => {
          Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
        });
  
        Swal.fire('El detalle del usuario se han actualizado correctamente.', '', 'success');
      };
    }).catch((error) => {
      Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
    });
  }

}
