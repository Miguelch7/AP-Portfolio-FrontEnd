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
  showAddEstudio: boolean = false;
  showUpdateEstudio: boolean = false;
  estudioSeleccionado!: Estudio;
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

  toogleAddEstudio(): void {
    this.showAddEstudio = !this.showAddEstudio;
    this.showUpdateEstudio = false;
  }

  toogleUpdateEstudio(estudio: Estudio): void {
    this.showAddEstudio = false;
    this.estudioSeleccionado = estudio;
    this.showUpdateEstudio = !this.showUpdateEstudio;
  }

  addEstudio(estudio: Estudio): void {
    this.showAddEstudio = false;
    this.educacionService.createEstudio(estudio).subscribe((estudio: Estudio) => {
      this.listadoEstudios.push(estudio);
    });

    Swal.fire('El estudio se ha creado correctamente.', '', 'success');
  }

  updateEstudio(estudio: Estudio) {
    this.showUpdateEstudio = false;
    this.educacionService.updateEstudio(estudio).subscribe((estudio: Estudio) => {
      this.listadoEstudios = this.listadoEstudios.map(e => e.id === estudio.id ? e = estudio : e);
    });

    Swal.fire('El estudio se ha actualizado correctamente.', '', 'success');
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
