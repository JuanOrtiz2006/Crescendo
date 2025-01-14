import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Importación de librerías de enrutamiento
import { Database, ref, get, set } from '@angular/fire/database'; // Importación de librerías de Firebase para la lectura y escritura de datos
import { Storage } from '@ionic/storage-angular'; // Importación de librería para el localStorage
import { NavController } from '@ionic/angular'; // Importación de NavController

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  uid: string | null = null; // Variable para almacenar el uid
  nombre: string = ''; // Variable para almacenar el nombre del usuario
  message: string = '';
  rout: any;
  reset: any;
  isActionSheetOpen = false;
  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }

  constructor(
    private database: Database,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private navCtrl: NavController // NavController para navegación sin animaciones
  ) {}

  async ngOnInit() {
    this.rout = set(ref(this.database, 'Notas'), 99);
    this.uid = await this.storage.get('id');
    const userRef = ref(this.database, `Usuarios/${this.uid}/nombre`); // Usa el uid para leer el nombre del usuario de la base de datos
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      this.nombre = snapshot.val(); // Almacena el nombre en la variable 'nombre'
      await this.storage.set('usuario:', this.nombre);
      const name = this.storage.get('usuario');
      this.message = `Got value ${name}`;
    } else {
      console.log('No se encontró el nombre del usuario');
    }
  }

  // Navegación sin animación
  irPagina(encender: string) {
    this.navCtrl.navigateForward(['../nivel', { encender }]); // Navega sin animación
  }

  irPagina2(pagina: string) {
    this.navCtrl.navigateForward(['../biblioteca']); // Navega sin animación
  }
}
