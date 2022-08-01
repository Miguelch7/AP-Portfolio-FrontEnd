import { Component, OnInit } from '@angular/core';
import { faFileLines, faLocationDot, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { DetalleService } from '../../services/detalle.service';
import { Detalle } from './Detalle';


@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {

  detalle!: Detalle;

  faLocationDot: IconDefinition = faLocationDot;
  faFileLines: IconDefinition = faFileLines;

  constructor(
    private detalleService: DetalleService
  ) { }

  ngOnInit(): void {
    this.detalleService.getDetalle().subscribe((detalle: Detalle) => {
      this.detalle = detalle;
    });
  }

}
