import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  playIconChecked: boolean = true; // Inicialmente establecido como verdadero
  folderIconChecked: boolean = true; // Inicialmente establecido como verdadero

  irPagina(serie: string) {
    this.router.navigate(['../biblioteca-acordes', { serie: serie }]);
  }
  irPagina2(serie: string) {
    this.router.navigate(['../aprendizaje', { serie: serie }]);
  }

  irInicio() {
    this.router.navigate(['../inicio']); 
  }

 

  constructor(private router: Router) {
    
   }ngOnInit() {
  }

}
