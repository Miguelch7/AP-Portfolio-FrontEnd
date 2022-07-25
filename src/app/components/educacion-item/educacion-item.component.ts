import { Component, Input, OnInit } from '@angular/core';
import { Educacion } from '../educacion/Educacion';

@Component({
  selector: 'app-educacion-item',
  templateUrl: './educacion-item.component.html',
  styleUrls: ['./educacion-item.component.css']
})
export class EducacionItemComponent implements OnInit {

  @Input() educacion!: Educacion;

  constructor() { }

  ngOnInit(): void {
  }

}
