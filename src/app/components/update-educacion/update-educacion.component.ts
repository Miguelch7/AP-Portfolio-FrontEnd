import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Estudio } from '../../models/Estudio';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-educacion',
  templateUrl: './update-educacion.component.html',
  styleUrls: ['./update-educacion.component.css']
})
export class UpdateEducacionComponent implements OnInit {

  @Output() onUpdateEstudio: EventEmitter<Estudio> = new EventEmitter<Estudio>();
  @Input() estudio!: Estudio;

  file: any = null;

  constructor(
    private storage: Storage
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {  

    if (!this.estudio.titulo.trim() || !this.estudio.institucion.trim() || !this.estudio.descripcion.trim() || !this.estudio.fechaInicio.trim() || !this.estudio.fechaFin.trim()) {
      Swal.fire('Hubo un error!', 'Todos los campos son obligatorios', 'error');
      return;
    };

    const { id, titulo, institucion, descripcion, imagen, fechaInicio, fechaFin } = this.estudio;
    const nuevoEstudio = { id, titulo, institucion, descripcion, imagen, fechaInicio, fechaFin };

    if (this.file) {
      const imgRef = ref(this.storage, `images/${this.file.name}`);

      uploadBytes(imgRef, this.file).then(res => {
        getDownloadURL(res.ref).then(url => {
          nuevoEstudio.imagen = url;
        }).then(() => {
          this.onUpdateEstudio.emit(nuevoEstudio);
        }).catch(error => {
          Swal.fire('Advertencia!', 'No se pudo subir la imagen', 'warning');
        });
      }).catch(error => {
        Swal.fire('Hubo un error!', 'Ha ocurrido un error', 'error');
      });
    } else {
      this.onUpdateEstudio.emit(nuevoEstudio);
    };
    
    this.file = null;
  }

  capturarArchivo($event: any) {
    this.file = $event.target.files[0];
  }

}
