import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Database, ref, get } from '@angular/fire/database';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  uid: string | null = null; // Variable para almacenar el uid
  nombre: string = ""; // Variable para almacenar el nombre del usuario

  constructor(
    private database: Database,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Suscríbete a los parámetros de la ruta para obtener el uid
    this.route.params.subscribe(async params => {
      this.uid = params['uid']; // Almacena el uid en la variable 'uid'
      
      if (this.uid) {
        // Usa el uid para leer el nombre del usuario de la base de datos
        const userRef = ref(this.database, `Usuarios/${this.uid}/nombre`);
        
        // Realiza la consulta a la base de datos
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          // Almacena el nombre en la variable 'nombre'
          this.nombre = snapshot.val();
          console.log('Nombre del usuario:', this.nombre);
        } else {
          console.log('No se encontró el nombre del usuario');
        }
      }
    });
  }
  irPagina(encender: string) {
    this.router.navigate(['../nivel', { encender}]); // Pasar '1' como parámetro
  }
  irPagina2(pagina:string) {
    const name=this.nombre;
    this.router.navigate(['../biblioteca', {name}]);
  }
}