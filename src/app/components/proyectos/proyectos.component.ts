import { Component, OnInit } from '@angular/core';
import { faCirclePlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/Proyecto';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: Proyecto[] = [];
  showAddProyecto: boolean = false;
  showUpdateProyecto: boolean = false;
  proyectoSeleccionado!: Proyecto;
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

  toogleAddProyecto(): void {
    this.showAddProyecto = !this.showAddProyecto;
    this.showUpdateProyecto = false;
  }

  toogleUpdateProyecto(proyecto: Proyecto): void {
    this.showAddProyecto = false;
    this.proyectoSeleccionado = proyecto;
    this.showUpdateProyecto = !this.showUpdateProyecto;
  }

  addProyecto(proyecto: Proyecto): void {
    this.showAddProyecto = false;
    this.proyectoService.createProyecto(proyecto).subscribe((proyecto: Proyecto) => {
      this.proyectos.push(proyecto);
    });
    
    Swal.fire('El proyecto se ha creado correctamente.', '', 'success');
  }

  updateProyecto(proyecto: Proyecto): void {
    this.showUpdateProyecto = false;
    this.proyectoService.updateProyecto(proyecto).subscribe((proyecto: Proyecto) => {
      this.proyectos = this.proyectos.map(p => p.id === proyecto.id ? p = proyecto : p);
    });

    Swal.fire('El proyecto se ha actualizado correctamente.', '', 'success');
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
