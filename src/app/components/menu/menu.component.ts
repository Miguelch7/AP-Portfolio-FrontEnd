import { Component, OnInit } from '@angular/core';
import { IconDefinition, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  showMenu: boolean = false;
  faBars: IconDefinition = faBars;
  faTimes: IconDefinition = faTimes;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onClick():void {
    this.showMenu = !this.showMenu;
  }

  logout(): void {
    Swal.fire({
      text: "¿Estás seguro que deseas cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cierre de sesión éxitoso',
          showConfirmButton: false,
          timer: 2000
        });

        this.authService.logout();
      };
    });
  }

}
