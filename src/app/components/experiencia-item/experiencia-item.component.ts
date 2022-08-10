import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrashAlt, faPenToSquare, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Trabajo } from '../../models/Trabajo';

@Component({
  selector: 'app-experiencia-item',
  templateUrl: './experiencia-item.component.html',
  styleUrls: ['./experiencia-item.component.css']
})
export class ExperienciaItemComponent implements OnInit {

  @Input() trabajo!: Trabajo;
  @Output() onUpdateTrabajo: EventEmitter<Trabajo> = new EventEmitter<Trabajo>();
  @Output() onDeleteTrabajo: EventEmitter<Trabajo> = new EventEmitter<Trabajo>();
  iconEdit: IconDefinition = faPenToSquare;
  iconDelete: IconDefinition = faTrashAlt;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onUpdate(trabajo: Trabajo): void {
    this.onUpdateTrabajo.emit(trabajo);
  }

  onDelete(trabajo: Trabajo): void {
    this.onDeleteTrabajo.emit(trabajo);
  }
}
