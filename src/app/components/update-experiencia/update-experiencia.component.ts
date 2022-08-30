import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Trabajo } from '../../models/Trabajo';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-experiencia',
  templateUrl: './update-experiencia.component.html',
  styleUrls: ['./update-experiencia.component.css']
})
export class UpdateExperienciaComponent implements OnInit {

  @Output() onUpdateExperiencia: EventEmitter<Trabajo> = new EventEmitter<Trabajo>();
  @Input() trabajo!: Trabajo;

  file: any = null;

  constructor(
    private storage: Storage
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {  

    if (!this.trabajo.puesto.trim() || !this.trabajo.empresa.trim() || !this.trabajo.descripcion.trim() || !this.trabajo.fechaInicio.trim() || !this.trabajo.fechaFin.trim()) {
      Swal.fire('Hubo un error!', 'Todos los campos son obligatorios', 'error');
      return;
    };

    const { id, puesto, empresa, descripcion, imagen, fechaInicio, fechaFin } = this.trabajo;
    const nuevaExperiencia = { id, puesto, empresa, descripcion, imagen, fechaInicio, fechaFin };

    if (this.file) {
      const imgRef = ref(this.storage, `images/${this.file.name}`);

      console.log(imgRef);
      
      uploadBytes(imgRef, this.file).then(res => {
        getDownloadURL(res.ref).then(url => {
          nuevaExperiencia.imagen = url;
        }).then(() => {
          this.onUpdateExperiencia.emit(nuevaExperiencia);
        }).catch(error => {
          Swal.fire('Advertencia!', 'No se pudo subir la imagen', 'warning');
        });
      }).catch(error => {
        Swal.fire('Hubo un error!', 'Ha ocurrido un error', 'error');
      });
    } else {
      this.onUpdateExperiencia.emit(nuevaExperiencia);
    };
    
    Swal.fire('El proyecto se ha creado correctamente.', '', 'success');
    this.file = null;
  }

  capturarArchivo($event: any) {
    this.file = $event.target.files[0];
  }

}
