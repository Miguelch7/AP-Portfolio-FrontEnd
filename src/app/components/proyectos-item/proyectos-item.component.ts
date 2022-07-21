import { Component, Input, OnInit } from '@angular/core';
import { Proyecto } from '../proyectos/Proyecto';
import { LISTADO_PROYECTOS } from '../proyectos/mock-proyectos';

@Component({
  selector: 'app-proyectos-item',
  templateUrl: './proyectos-item.component.html',
  styleUrls: ['./proyectos-item.component.css']
})
export class ProyectosItemComponent implements OnInit {

  @Input() proyecto: Proyecto = LISTADO_PROYECTOS[0];

  constructor() { }

  ngOnInit(): void {
  }

}
