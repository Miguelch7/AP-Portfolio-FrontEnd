import { Component, Input, OnInit } from '@angular/core';
import { Educacion } from '../educacion/Educacion';
import { LISTADO_EDUCACION } from '../educacion/mock-educacion';

@Component({
  selector: 'app-educacion-item',
  templateUrl: './educacion-item.component.html',
  styleUrls: ['./educacion-item.component.css']
})
export class EducacionItemComponent implements OnInit {

  @Input() educacion: Educacion = LISTADO_EDUCACION[0];

  constructor() { }

  ngOnInit(): void {
  }

}
