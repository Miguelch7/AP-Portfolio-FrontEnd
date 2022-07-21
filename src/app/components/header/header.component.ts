import { Component, OnInit } from '@angular/core';
import { faLinkedin, IconDefinition  } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mensajes: string[] = ['el desarrollo web.', 'la programación y la tecnología.', 'trabajar en equipo.', 'aprender.'];
  faLinkedin: IconDefinition = faLinkedin;

  constructor() { }

  ngOnInit(): void {
  }

}
