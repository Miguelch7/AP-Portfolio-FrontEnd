import { Component, OnInit } from '@angular/core';
import { Proyecto } from './Proyecto';
import { LISTADO_PROYECTOS } from './mock-proyectos';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: Proyecto[] = LISTADO_PROYECTOS;

  constructor() { }

  ngOnInit(): void {
  }

}
