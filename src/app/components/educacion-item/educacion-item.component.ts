import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconDefinition, faPenToSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Estudio } from '../../models/Estudio';

@Component({
  selector: 'app-educacion-item',
  templateUrl: './educacion-item.component.html',
  styleUrls: ['./educacion-item.component.css']
})
export class EducacionItemComponent implements OnInit {

  @Input() estudio!: Estudio;
  @Output() onUpdateEstudio: EventEmitter<Estudio> = new EventEmitter<Estudio>();
  @Output() onDeleteEstudio: EventEmitter<Estudio> = new EventEmitter<Estudio>();
  iconEdit: IconDefinition = faPenToSquare;
  iconDelete: IconDefinition = faTrashAlt;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onUpdate(estudio: Estudio): void {
    this.onUpdateEstudio.emit(estudio);
  }

  onDelete(estudio: Estudio): void {
    this.onDeleteEstudio.emit(estudio);
  }
}
