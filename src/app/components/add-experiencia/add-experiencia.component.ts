import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Trabajo } from '../../models/Trabajo';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-experiencia',
  templateUrl: './add-experiencia.component.html',
  styleUrls: ['./add-experiencia.component.css']
})
export class AddExperienciaComponent implements OnInit {

  @Output() onAddExperiencia: EventEmitter<Trabajo> = new EventEmitter<Trabajo>();

  puesto: string = '';
  empresa: string = '';
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

    if (!this.puesto.trim() || !this.empresa.trim() || !this.descripcion.trim() || !this.fechaInicio.trim() || !this.fechaFin.trim()) {
      Swal.fire('Hubo un error!', 'Todos los campos son obligatorios', 'error');
      return;
    };

    const { puesto, empresa, descripcion, imagen, fechaInicio, fechaFin } = this;
    const nuevaExperiencia = { puesto, empresa, descripcion, imagen, fechaInicio, fechaFin };

    if (this.file) {
      const imgRef = ref(this.storage, `images/${this.file.name}`);
      
      uploadBytes(imgRef, this.file).then(res => {
        getDownloadURL(res.ref).then(url => {
          nuevaExperiencia.imagen = url;
        }).then(() => {
          this.onAddExperiencia.emit(nuevaExperiencia);
        }).catch(error => {
          Swal.fire('Advertencia!', 'No se pudo subir la imagen', 'warning');
        });
      }).catch(error => {
        Swal.fire('Hubo un error!', 'Ha ocurrido un error', 'error');
      });

    };
    
    Swal.fire('El proyecto se ha creado correctamente.', '', 'success');
    this.puesto = '';
    this.empresa = '';
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
