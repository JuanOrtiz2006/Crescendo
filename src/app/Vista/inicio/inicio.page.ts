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

  irPagina() {
    this.router.navigate(['../nivel']); 
  }

  irPagina2() {
    this.router.navigate(['../biblioteca']); 
  }

  activar() {
    this.router.navigate(['../inicio']); 
    const ledState = doc(this.db, 'ControlTeclado', 'led1'); // RUTA DE TABLA EN LA BD
    setDoc(ledState, { encender: true}); // CAMBIA EL ATRIBUTO DE LA TABLA
  
  }

  

  ngOnInit() {
  }

}
