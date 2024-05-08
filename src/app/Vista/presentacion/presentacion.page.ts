import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.page.html',
  styleUrls: ['./presentacion.page.scss'],
})
export class PresentacionPage implements OnInit {
  constructor(private router:Router, private storage:Storage) { }
  ngOnInit() {
    this.storage.create();
    this.storage.remove('id');
    const dato=this.storage.get('id');
    console.log(dato);
  }
  irPagina() {
    this.router.navigate(['../registro-usuario']); //Metodo para ir a la pagina de registro
  }
}