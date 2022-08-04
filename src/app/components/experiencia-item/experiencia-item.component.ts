import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experiencia } from '../experiencia/Experiencia';
import { faTrashAlt, faPenToSquare, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-experiencia-item',
  templateUrl: './experiencia-item.component.html',
  styleUrls: ['./experiencia-item.component.css']
})
export class ExperienciaItemComponent implements OnInit {

  @Input() experiencia!: Experiencia;
  @Output() onUpdateExperiencia: EventEmitter<Experiencia> = new EventEmitter<Experiencia>();
  @Output() onDeleteExperiencia: EventEmitter<Experiencia> = new EventEmitter<Experiencia>();
  iconEdit: IconDefinition = faPenToSquare;
  iconDelete: IconDefinition = faTrashAlt;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onUpdate(experiencia: Experiencia): void {
    this.onUpdateExperiencia.emit(experiencia);
  }

  onDelete(experiencia: Experiencia): void {
    this.onDeleteExperiencia.emit(experiencia);
  }
}
