import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProyectosComponent } from './update-proyectos.component';

describe('UpdateProyectosComponent', () => {
  let component: UpdateProyectosComponent;
  let fixture: ComponentFixture<UpdateProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
