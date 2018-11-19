import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorNovoPage } from './professor-novo.page';

describe('ProfessorNovoPage', () => {
  let component: ProfessorNovoPage;
  let fixture: ComponentFixture<ProfessorNovoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorNovoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorNovoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
