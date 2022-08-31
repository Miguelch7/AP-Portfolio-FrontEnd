import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProyectosComponent } from './add-proyectos.component';

describe('AddProyectosComponent', () => {
  let component: AddProyectosComponent;
  let fixture: ComponentFixture<AddProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
