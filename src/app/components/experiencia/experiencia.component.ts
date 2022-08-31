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
  showAddExperiencia: boolean = false;
  showUpdateExperiencia: boolean = false;
  trabajoSeleccionado!: Trabajo;
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

  toogleAddExperiencia(): void {
    this.showAddExperiencia = !this.showAddExperiencia;
    this.showUpdateExperiencia = false;
  }

  toogleUpdateExperiencia(trabajo: Trabajo): void {
    this.showAddExperiencia = false;
    this.trabajoSeleccionado = trabajo;
    this.showUpdateExperiencia = !this.showUpdateExperiencia;
  }

  addTrabajo(trabajo: Trabajo): void {
    this.showAddExperiencia = false;
    this.experienciaService.createTrabajo(trabajo).subscribe((trabajo: Trabajo) => {
      this.trabajos.push(trabajo);
    });

    Swal.fire('El trabajo se ha creado correctamente.', '', 'success');
  }

  updateTrabajo(trabajo: Trabajo): void {
    this.showUpdateExperiencia = false;
    this.experienciaService.updateTrabajo(trabajo).subscribe((trabajo: Trabajo) => {
      this.trabajos = this.trabajos.map(t => t.id === trabajo.id ? t = trabajo : t);
    });

    Swal.fire('El trabajo se ha actualizado correctamente.', '', 'success');
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
