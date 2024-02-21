import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscalasPage } from './escalas.page';

describe('EscalasPage', () => {
  let component: EscalasPage;
  let fixture: ComponentFixture<EscalasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EscalasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
