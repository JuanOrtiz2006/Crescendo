import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';//Importacion de libreriar de enrutamiento
import { Database, ref, get,set } from '@angular/fire/database';//Importacion de librerias de firebase para la lctura y escritura de datos
import { Storage } from '@ionic/storage-angular';//Importacion de libreria para el localStorage
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  uid: string | null = null; // Variable para almacenar el uid
  nombre: string = ""; // Variable para almacenar el nombre del usuario
  message:string="";
  rout:any;
  reset:any;
  constructor(private database: Database, private router: Router, private route: ActivatedRoute, private storage:Storage){
  }
  async ngOnInit() {  
    this.uid= await this.storage.get("id");
    const userRef = ref(this.database, `Usuarios/${this.uid}/nombre`); // Usa el uid para leer el nombre del usuario de la base de datos
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      this.nombre = snapshot.val();// Almacena el nombre en la variable 'nombre'
      await this.storage.set("usuario:",this.nombre);
      const name = this.storage.get("usuario");
      this.message = `Got value ${name}`;
    } else {
      console.log('No se encontró el nombre del usuario');
    }
  }
  irPagina(encender: string) {
    this.router.navigate(['../nivel', { encender}]); // Pasar '1' como parámetro
  }
  irPagina2(pagina:string) {
    const name=this.nombre;
    this.router.navigate(['../biblioteca']);
  }
}