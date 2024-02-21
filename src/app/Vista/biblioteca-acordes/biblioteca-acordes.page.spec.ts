import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BibliotecaAcordesPage } from './biblioteca-acordes.page';

describe('BibliotecaAcordesPage', () => {
  let component: BibliotecaAcordesPage;
  let fixture: ComponentFixture<BibliotecaAcordesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BibliotecaAcordesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
