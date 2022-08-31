import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Proyecto } from '../../models/Proyecto';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-proyectos',
  templateUrl: './add-proyectos.component.html',
  styleUrls: ['./add-proyectos.component.css']
})
export class AddProyectosComponent implements OnInit {

  @Output() onAddProyecto: EventEmitter<Proyecto> = new EventEmitter<Proyecto>();

  nombre: string = '';
  descripcion: string = '';
  imagen: string = '';
  linkProyecto: string = '';
  linkRepositorio: string = '';
  file: any = null;

  constructor(
    private storage: Storage
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {  

    if (!this.nombre.trim() || !this.descripcion.trim() || !this.linkProyecto.trim() || !this.linkRepositorio.trim()) {
      Swal.fire('Hubo un error!', 'Todos los campos son obligatorios', 'error');
      return;
    };

    const { nombre, descripcion, imagen, linkProyecto, linkRepositorio } = this;
    const nuevoProyecto = { nombre, descripcion, imagen, linkProyecto, linkRepositorio };

    if (this.file) {
      const imgRef = ref(this.storage, `images/${this.file.name}`);
      
      uploadBytes(imgRef, this.file).then(res => {
        getDownloadURL(res.ref).then(url => {
          nuevoProyecto.imagen = url;
        }).then(() => {
          this.onAddProyecto.emit(nuevoProyecto);
        }).catch(error => {
          Swal.fire('Advertencia!', 'No se pudo subir la imagen', 'warning');
        });
      }).catch(error => {
        Swal.fire('Hubo un error!', 'Ha ocurrido un error', 'error');
      });

    };
    
    this.nombre = '';
    this.descripcion = '';
    this.imagen = '';
    this.linkProyecto = '';
    this.linkRepositorio = '';
    this.file = null;
  }

  capturarArchivo($event: any) {
    this.file = $event.target.files[0];
  }

}
