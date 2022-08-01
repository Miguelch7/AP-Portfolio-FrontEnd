import { Component, OnInit } from '@angular/core';
import { Experiencia } from './Experiencia';
import { ExperienciaService } from '../../services/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experiencias: Experiencia[] = [];

  constructor(
    private experienciaService: ExperienciaService
  ) { }

  ngOnInit(): void {
    this.experienciaService.getTrabajos().subscribe((trabajos: Experiencia[]) => {
      this.experiencias = trabajos;
    })
  }

}
