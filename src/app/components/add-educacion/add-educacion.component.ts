import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Estudio } from '../../models/Estudio';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-educacion',
  templateUrl: './add-educacion.component.html',
  styleUrls: ['./add-educacion.component.css']
})
export class AddEducacionComponent implements OnInit {

  @Output() onAddEstudio: EventEmitter<Estudio> = new EventEmitter<Estudio>();

  titulo: string = '';
  institucion: string = '';
  descripcion: string = '';
  imagen: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  file: any = null;

  constructor(
    private storage: Storage
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {  

    if (!this.titulo.trim() || !this.institucion.trim() || !this.descripcion.trim() || !this.fechaInicio.trim() || !this.fechaFin.trim()) {
      Swal.fire('Hubo un error!', 'Todos los campos son obligatorios', 'error');
      return;
    };

    const { titulo, institucion, descripcion, imagen, fechaInicio, fechaFin } = this;
    const nuevoEstudio = { titulo, institucion, descripcion, imagen, fechaInicio, fechaFin };

    if (this.file) {
      const imgRef = ref(this.storage, `images/${this.file.name}`);
      
      uploadBytes(imgRef, this.file).then(res => {
        getDownloadURL(res.ref).then(url => {
          nuevoEstudio.imagen = url;
        }).then(() => {
          this.onAddEstudio.emit(nuevoEstudio);
        }).catch(error => {
          Swal.fire('Advertencia!', 'No se pudo subir la imagen', 'warning');
        });
      }).catch(error => {
        Swal.fire('Hubo un error!', 'Ha ocurrido un error', 'error');
      });

    };
    
    this.titulo = '';
    this.institucion = '';
    this.descripcion = '';
    this.imagen = '';
    this.fechaInicio = '';
    this.fechaFin = '';
    this.file = null;
  }

  capturarArchivo($event: any) {
    this.file = $event.target.files[0];
  }

}
