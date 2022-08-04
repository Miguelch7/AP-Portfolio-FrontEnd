import { Component, OnInit } from '@angular/core';
import { faCirclePlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from './Proyecto';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: Proyecto[] = [];
  iconAdd: IconDefinition = faCirclePlus;

  constructor(
    public authService: AuthService,
    private proyectoService: ProyectoService
  ) { }

  ngOnInit(): void {
    this.proyectoService.getProyectos().subscribe((proyectos: Proyecto[]) => {
      this.proyectos = proyectos;
    })
  }

  addProyecto(): void {
    Swal.fire({
      title: 'Añadir Proyecto',
      html: `
        <div class="form-sweet-alert">
          <div class="form-control">
            <label for="nombre">Nombre: </label>
            <input type="text" id="nombre" class="swal2-input" placeholder="Ingrese el nombre del proyecto">
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
            <label for="link_proyecto">Link del proyecto: </label>
            <input type="text" id="link_proyecto" class="swal2-input" placeholder="Ingrese el link del proyecto">
          </div>

          <div class="form-control">
            <label for="link_repositorio">Link del repositorio: </label>
            <input type="text" id="link_repositorio" class="swal2-input" placeholder="Ingrese el link del repositorio">
          </div>
        </ div>
      `,
      width: '60%',
      confirmButtonText: 'Guardar proyecto',
      focusConfirm: false,
      preConfirm: () => {
        const nombre: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#nombre')).value;
        const descripcion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#descripcion')).value;
        const imagen: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#imagen')).value;
        const link_proyecto: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#link_proyecto')).value;
        const link_repositorio: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#link_repositorio')).value;

        // Validar campos
        if (!nombre || !descripcion || !imagen || !link_proyecto || !link_repositorio) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        };

        return { nombre, descripcion, imagen, link_proyecto, link_repositorio };
      }
    }).then((result) => {
      
      const proyecto: Proyecto = result.value!;

      if (proyecto) {
        this.proyectoService.addProyecto(proyecto).subscribe((proyecto: Proyecto) => {
          this.proyectos.push(proyecto);
          Swal.fire('El proyecto se ha creado correctamente.', '', 'success');
        }, (error) => {
          Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
        });
  
      };
    }).catch((error) => {
      Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
    });
  }

  updateProyecto(proyecto: Proyecto): void {
    Swal.fire({
      title: 'Actualizar Proyecto',
      html: `
        <div class="form-sweet-alert">
          <div class="form-control">
            <label for="nombre">Nombre: </label>
            <input type="text" id="nombre" class="swal2-input" placeholder="Ingrese el nombre del proyecto" value="${ proyecto.nombre }">
          </div>

          <div class="form-control">
            <label for="descripcion">Descripción: </label>
            <textarea id="descripcion" class="swal2-input" placeholder="Ingrese una descripcion" row="10">${ proyecto.descripcion }</textarea>
          </div>

          <div class="form-control">
            <label for="imagen">URL de la imagen: </label>
            <input type="text" id="imagen" class="swal2-input" placeholder="Ingrese la url de la imagen" value="${ proyecto.imagen }">
          </div>

          <div class="form-control">
            <label for="link_proyecto">Link del proyecto: </label>
            <input type="text" id="link_proyecto" class="swal2-input" placeholder="Ingrese el link del proyecto" value="${ proyecto.link_proyecto }">
          </div>

          <div class="form-control">
            <label for="link_repositorio">Link del repositorio: </label>
            <input type="text" id="link_repositorio" class="swal2-input" placeholder="Ingrese el link del repositorio" value="${ proyecto.link_repositorio }">
          </div>
        </ div>
      `,
      width: '60%',
      confirmButtonText: 'Actualizar proyecto',
      focusConfirm: false,
      preConfirm: () => {
        const nombre: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#nombre')).value;
        const descripcion: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#descripcion')).value;
        const imagen: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#imagen')).value;
        const link_proyecto: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#link_proyecto')).value;
        const link_repositorio: string = (<HTMLInputElement> Swal.getPopup()?.querySelector('#link_repositorio')).value;

        // Validar campos
        if (!nombre || !descripcion || !imagen || !link_proyecto || !link_repositorio) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        };

        return { ...proyecto, nombre, descripcion, imagen, link_proyecto, link_repositorio };
      }
    }).then((result) => {
      
      const proyectoActualizado: Proyecto = result.value!;

      if (proyectoActualizado) {
        this.proyectoService.updateProyecto(proyectoActualizado).subscribe((proyecto: Proyecto) => {
          this.proyectos = this.proyectos.map(p => p.id === proyecto.id ? p = proyecto : p);

          Swal.fire('El proyecto se ha actualizado correctamente.', '', 'success');
        }, (error) => {
          Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
        });
  
      };
    }).catch((error) => {
      Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
    });
  }

  deleteProyecto(proyecto: Proyecto): void {

    Swal.fire({
      title: 'Estás seguro que deseas eliminar este proyecto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.proyectoService.deleteProyecto(proyecto).subscribe((id: number) => {
          this.proyectos = this.proyectos.filter(p => p.id !== id);
          Swal.fire('El proyecto se ha eliminado correctamente.', '', 'success');
        }, (error) => {
          Swal.fire('Ups!', 'Ha ocurrido un error, por favor intente nuevamente.', 'error');
        });
      };
    });
  }
}
