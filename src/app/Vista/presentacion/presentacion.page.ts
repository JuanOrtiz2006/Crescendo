import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Database, object, ref, set } from '@angular/fire/database';
@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.page.html',
  styleUrls: ['./presentacion.page.scss'],
})
export class PresentacionPage implements OnInit {
  constructor(private router:Router, private storage:Storage, private database:Database) { }
  rout:any;
  ngOnInit() {
    this.storage.create();
    this.cleanRDTB();
    this.iniciarRDTB();
  }
  async cleanRDTB()
  {
    this.storage.remove('id');
  }

  async iniciarRDTB(){
    this.rout = set(ref(this.database, 'Notas'), 99);      
  }
  irPagina() {
    this.router.navigate(['../registro-usuario']); //Metodo para ir a la pagina de registro
  }
}