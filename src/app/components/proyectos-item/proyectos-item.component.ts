import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrashAlt, faPenToSquare, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Proyecto } from '../proyectos/Proyecto';

@Component({
  selector: 'app-proyectos-item',
  templateUrl: './proyectos-item.component.html',
  styleUrls: ['./proyectos-item.component.css']
})
export class ProyectosItemComponent implements OnInit {

  @Input() proyecto!: Proyecto;
  @Output() onUpdateProyecto: EventEmitter<Proyecto> = new EventEmitter<Proyecto>();
  @Output() onDeleteProyecto: EventEmitter<Proyecto> = new EventEmitter<Proyecto>();
  iconEdit: IconDefinition = faPenToSquare;
  iconDelete: IconDefinition = faTrashAlt;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onUpdate(proyecto: Proyecto): void {
    this.onUpdateProyecto.emit(proyecto);
  }

  onDelete(proyecto: Proyecto): void {
    this.onDeleteProyecto.emit(proyecto);
  }
}
