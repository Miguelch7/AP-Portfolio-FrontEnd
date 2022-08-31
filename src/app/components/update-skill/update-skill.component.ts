import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Skill } from '../../models/Skill';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-skill',
  templateUrl: './update-skill.component.html',
  styleUrls: ['./update-skill.component.css']
})
export class UpdateSkillComponent implements OnInit {

  @Output() onUpdateSkill: EventEmitter<Skill> = new EventEmitter<Skill>();
  @Input() skill!: Skill;

  file: any = null;

  constructor(
    private storage: Storage
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {  

    if (!this.skill.nombre.trim() || !this.skill.porcentaje) {
      Swal.fire('Hubo un error!', 'Todos los campos son obligatorios', 'error');
      return;
    };

    const { id, nombre, descripcion, imagen, porcentaje } = this.skill;
    const nuevaSkill = { id, nombre, descripcion, imagen, porcentaje };

    if (this.file) {
      const imgRef = ref(this.storage, `images/${this.file.name}`);

      uploadBytes(imgRef, this.file).then(res => {
        getDownloadURL(res.ref).then(url => {
          nuevaSkill.imagen = url;
        }).then(() => {
          this.onUpdateSkill.emit(nuevaSkill);
        }).catch(error => {
          Swal.fire('Advertencia!', 'No se pudo subir la imagen', 'warning');
        });
      }).catch(error => {
        Swal.fire('Hubo un error!', 'Ha ocurrido un error', 'error');
      });
    } else {
      this.onUpdateSkill.emit(nuevaSkill);
    };
    
    this.file = null;
  }

  capturarArchivo($event: any) {
    this.file = $event.target.files[0];
  }
}
