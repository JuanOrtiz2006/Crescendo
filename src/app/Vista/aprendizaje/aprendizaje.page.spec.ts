import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AprendizajePage } from './aprendizaje.page';

describe('AprendizajePage', () => {
  let component: AprendizajePage;
  let fixture: ComponentFixture<AprendizajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AprendizajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
