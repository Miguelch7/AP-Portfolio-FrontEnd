import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Proyecto } from '../../models/Proyecto';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-proyectos',
  templateUrl: './update-proyectos.component.html',
  styleUrls: ['./update-proyectos.component.css']
})
export class UpdateProyectosComponent implements OnInit {

  @Output() onUpdateProyecto: EventEmitter<Proyecto> = new EventEmitter<Proyecto>();
  @Input() proyecto!: Proyecto;

  file: any = null;

  constructor(
    private storage: Storage
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {  

    if (!this.proyecto.nombre.trim() || !this.proyecto.descripcion.trim() || !this.proyecto.linkProyecto.trim() || !this.proyecto.linkRepositorio.trim()) {
      Swal.fire('Hubo un error!', 'Todos los campos son obligatorios', 'error');
      return;
    };

    const { id, nombre, descripcion, imagen, linkProyecto, linkRepositorio } = this.proyecto;
    const nuevoProyecto = { id, nombre, descripcion, imagen, linkProyecto, linkRepositorio };

    if (this.file) {
      const imgRef = ref(this.storage, `images/${this.file.name}`);

      uploadBytes(imgRef, this.file).then(res => {
        getDownloadURL(res.ref).then(url => {
          nuevoProyecto.imagen = url;
        }).then(() => {
          this.onUpdateProyecto.emit(nuevoProyecto);
        }).catch(error => {
          Swal.fire('Advertencia!', 'No se pudo subir la imagen', 'warning');
        });
      }).catch(error => {
        Swal.fire('Hubo un error!', 'Ha ocurrido un error', 'error');
      });
    } else {
      this.onUpdateProyecto.emit(nuevoProyecto);
    };
    
    this.file = null;
  }

  capturarArchivo($event: any) {
    this.file = $event.target.files[0];
  }

}
