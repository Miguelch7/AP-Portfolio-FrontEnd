import { Component, OnInit } from '@angular/core';
import { IconDefinition, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  showMenu: boolean = false;
  faBars: IconDefinition = faBars;
  faTimes: IconDefinition = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

  onClick():void {
    this.showMenu = !this.showMenu;
  }

}
