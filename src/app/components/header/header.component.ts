import { Component, OnInit } from '@angular/core';
import { faLinkedin, IconDefinition  } from '@fortawesome/free-brands-svg-icons';
import { DetalleService } from '../../services/detalle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nombre!: string;
  apellido!: string;
  profesion!: string;

  mensajes: string[] = ['el desarrollo web.', 'la programación y la tecnología.', 'trabajar en equipo.', 'aprender.'];
  faLinkedin: IconDefinition = faLinkedin;

  constructor(
    private detalleService: DetalleService
  ) { }

  ngOnInit(): void {
    this.detalleService.getDetalle().subscribe(({ nombre, apellido, profesion }) => {      
      this.nombre = nombre.toUpperCase();
      this.apellido = apellido.toUpperCase();
      this.profesion = profesion;
    });
  }

}
