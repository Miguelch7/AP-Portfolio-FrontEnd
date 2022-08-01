import { Component, OnInit } from '@angular/core';
import { Proyecto } from './Proyecto';
import { ProyectoService } from '../../services/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: Proyecto[] = [];

  constructor(
    private proyectoService: ProyectoService
  ) { }

  ngOnInit(): void {
    this.proyectoService.getProyectos().subscribe((proyectos: Proyecto[]) => {
      this.proyectos = proyectos;
    })
  }

}
