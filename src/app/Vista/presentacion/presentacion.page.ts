import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Database, ref, set } from '@angular/fire/database';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.page.html',
  styleUrls: ['./presentacion.page.scss'],
})
export class PresentacionPage implements OnInit {
  constructor(private router: Router, private storage: Storage, private database: Database) {}

  async ngOnInit() {
    await this.storage.create();
    this.cleanRDTB();
    this.iniciarRDTB();
  }

  async cleanRDTB() {
    await this.storage.remove('id');
  }

  iniciarRDTB() {
    set(ref(this.database, 'Notas'), 99);
  }

  irPagina() {
    this.router.navigate(['../registro-usuario']); // Navega a la página de registro
  }
}
