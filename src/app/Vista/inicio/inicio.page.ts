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