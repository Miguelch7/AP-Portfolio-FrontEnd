import { Component, OnInit } from '@angular/core';
import { Experiencia } from './Experiencia';
import { LISTADO_EXPERIENCIAS } from './mock-experiencias';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experiencias: Experiencia[] = LISTADO_EXPERIENCIAS;

  constructor() { }

  ngOnInit(): void {
  }

}
