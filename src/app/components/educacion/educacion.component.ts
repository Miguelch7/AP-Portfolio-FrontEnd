import { Component, OnInit } from '@angular/core';
import { EducacionService } from 'src/app/services/educacion.service';
import { Educacion } from './Educacion';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  listadoEducacion: Educacion[] = [];

  constructor(
    private educacionService: EducacionService
  ) { }

  ngOnInit(): void {
    this.educacionService.getEstudios().subscribe((estudios: Educacion[]) => {
      this.listadoEducacion = estudios;
    });
  }

}
