import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Database, object, ref, set } from '@angular/fire/database';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  pagina:string=""; 
  return:any; 
  rout:any; //variable para la ruta de lectura y excritura de la RTDB

  constructor(private database:Database, private router: Router, private route:ActivatedRoute) {}
  
  ngOnInit() {
    this.rout = set(ref(this.database, 'Notas'), 99);//Esvribe el indice en la RTDB
  }
  irPagina(encender: string) {
    this.router.navigate(['../nivel', { encender}]); // Pasar '1' como parámetro
  }
  irPagina2(pagina:string) {
    this.router.navigate(['../biblioteca']);
  }
}