import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Educacion } from '../educacion/Educacion';
import { IconDefinition, faPenToSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-educacion-item',
  templateUrl: './educacion-item.component.html',
  styleUrls: ['./educacion-item.component.css']
})
export class EducacionItemComponent implements OnInit {

  @Input() educacion!: Educacion;
  @Output() onUpdateEducacion: EventEmitter<Educacion> = new EventEmitter<Educacion>();
  @Output() onDeleteEducacion: EventEmitter<Educacion> = new EventEmitter<Educacion>();
  iconEdit: IconDefinition = faPenToSquare;
  iconDelete: IconDefinition = faTrashAlt;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onUpdate(educacion: Educacion): void {
    this.onUpdateEducacion.emit(educacion);
  }

  onDelete(educacion: Educacion): void {
    this.onDeleteEducacion.emit(educacion);
  }
}
