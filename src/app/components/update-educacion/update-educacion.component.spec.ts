import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEducacionComponent } from './update-educacion.component';

describe('UpdateEducacionComponent', () => {
  let component: UpdateEducacionComponent;
  let fixture: ComponentFixture<UpdateEducacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEducacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEducacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
