import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Firestore,doc,setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  db:any;  
  constructor(private router: Router, private route:ActivatedRoute) {}

  checkboxChecked: boolean = false;

  irPagina(encender: string) {
    this.router.navigate(['../nivel', { '1': encender }]); // Pasar '1' como parámetro
  }

  irPagina2(pagina:string) {
    this.router.navigate(['../biblioteca', { pagina: pagina }]);
  }

pagina:string="";
  

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.checkboxChecked = this.pagina === 'si'; // Convertir el valor a booleano
    });
  }

}
