import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExperienciaComponent } from './update-experiencia.component';

describe('UpdateExperienciaComponent', () => {
  let component: UpdateExperienciaComponent;
  let fixture: ComponentFixture<UpdateExperienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateExperienciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
