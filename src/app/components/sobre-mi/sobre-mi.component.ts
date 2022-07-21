import { Component, OnInit } from '@angular/core';
import { faFileLines, faLocationDot, IconDefinition } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {

  faLocationDot: IconDefinition = faLocationDot;
  faFileLines: IconDefinition = faFileLines;

  constructor() { }

  ngOnInit(): void {
  }

}
