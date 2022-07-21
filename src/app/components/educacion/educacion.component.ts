import { Component, OnInit } from '@angular/core';
import { Educacion } from './Educacion';
import { LISTADO_EDUCACION } from './mock-educacion';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  listadoEducacion: Educacion[] = LISTADO_EDUCACION;

  constructor() { }

  ngOnInit(): void {
  }

}
