import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  pagina: string="";
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {}
  irPagina(serie: string) {
    this.router.navigate(['../biblioteca-acordes', { serie: serie }]);
  }
  irPagina2(serie: string) {
    this.router.navigate(['../aprendizaje', { serie: serie }]);
  }
  irInicio(pagina:string) {
    this.router.navigate(['../inicio', { pagina: pagina }]);
  }
}