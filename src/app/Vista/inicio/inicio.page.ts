import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore,doc,setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  db:any;  
  constructor(private router: Router) {}

  irPagina(encender: string) {
    this.router.navigate(['../nivel', {encender:encender}]);
  }


  irPagina2() {
    this.router.navigate(['../biblioteca' ]);
  }


  

  ngOnInit() {
  }

}
