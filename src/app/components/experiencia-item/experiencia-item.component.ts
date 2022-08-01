import { Component, Input, OnInit } from '@angular/core';
import { Experiencia } from '../experiencia/Experiencia';

@Component({
  selector: 'app-experiencia-item',
  templateUrl: './experiencia-item.component.html',
  styleUrls: ['./experiencia-item.component.css']
})
export class ExperienciaItemComponent implements OnInit {

  @Input() experiencia!: Experiencia;

  constructor() { }

  ngOnInit(): void {
  }

}
