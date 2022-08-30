import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Skill } from '../../models/Skill';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {

  @Output() onAddSkill: EventEmitter<Skill> = new EventEmitter<Skill>();

  nombre: string = '';
  descripcion: string = '';
  imagen: string = '';
  porcentaje: string = '';
  file: any = null;

  constructor(
    private storage: Storage
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {  

    if (!this.nombre.trim() || !this.porcentaje.trim()) {
      Swal.fire('Hubo un error!', 'Todos los campos son obligatorios', 'error');
      return;
    };

    const { nombre, descripcion, imagen, porcentaje } = this;
    const nuevaSkill = { nombre, descripcion, imagen, porcentaje: parseInt(porcentaje) };

    if (this.file) {
      const imgRef = ref(this.storage, `images/${this.file.name}`);
      
      uploadBytes(imgRef, this.file).then(res => {
        getDownloadURL(res.ref).then(url => {
          nuevaSkill.imagen = url;
        }).then(() => {
          this.onAddSkill.emit(nuevaSkill);
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
    this.porcentaje = '';
    this.file = null;
  }

  capturarArchivo($event: any) {
    this.file = $event.target.files[0];
  }

}
