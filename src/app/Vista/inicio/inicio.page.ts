import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  pagina:string="";  
  constructor(private router: Router, private route:ActivatedRoute) {}
  ngOnInit() {}
  irPagina(encender: string) {
    this.router.navigate(['../nivel', { encender}]); // Pasar '1' como parámetro
  }
  irPagina2(pagina:string) {
    this.router.navigate(['../biblioteca']);
  }
}