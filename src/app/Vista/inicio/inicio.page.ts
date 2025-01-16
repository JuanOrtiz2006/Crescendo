import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Database, ref, get, set } from '@angular/fire/database';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular'; // Importación de NavController

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  uid: string | null = null;
  nombre: string = '';
  message: string = '';
  segmentValue: string = 'Niveles'; // Valor inicial del segmento
  rout: any;
  reset: any;
  isActionSheetOpen = false;
  correo: string = '';
  
  portadas = [
    "/Portadas/portada_Principiante.svg",
    "/Portadas/portada_Intermedio.svg",
    "/Portadas/portada_Experto.svg",
    "/Portadas/BiblioMayores.svg",
    "/Portadas/BiblioMenores.svg",
    "/Portadas/escalas.svg"
  ];

  acordes = [
    '/Acordes/ADo.svg', '/Acordes/ARe.svg', '/Acordes/AMi.svg',
    '/Acordes/AFa.svg', '/Acordes/ASol.svg', '/Acordes/ALa.svg', '/Acordes/ASi.svg'
  ];

  acordesM = [
    '/Acordes/ADom.svg', '/Acordes/ARem.svg', '/Acordes/AMim.svg',
    '/Acordes/AFam.svg', '/Acordes/ASolm.svg', '/Acordes/ALam.svg', '/Acordes/ASim.svg'
  ];

  constructor(
    private database: Database,
    private router: Router,
    private storage: Storage,
    private alertController: AlertController,
    private navCtrl: NavController // NavController para navegación sin animaciones

  ) {}

  async ngOnInit() {
    this.uid = await this.storage.get('id');
    await this.obtenerDatosUsuario(this.uid);
  }

  async obtenerDatosUsuario(uid: string | null) {
    if (uid) {
      const userRef = ref(this.database, `Usuarios/${uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        this.nombre = userData.nombre;
        this.correo = userData.correo;
        await this.storage.set('usuario', this.nombre);
        await this.storage.set('correo', this.correo);
      } else {
        console.error('No se encontraron los datos del usuario');
      }
    } else {
      console.error('UID no encontrado en el local storage');
    }
  }

  onSegmentChange(event: any) {
    this.segmentValue = event.detail.value;
  }

  getPortadas(): string[] {
    if (this.segmentValue === 'Niveles') {
      return this.portadas.slice(0, 3);
    } else if (this.segmentValue === 'Biblioteca') {
      return this.portadas.slice(3);
    }
    return [];
  }

  // Función para realizar la acción según el clic en el card
  Accion(encender: string) {
    if (encender === "1") {
      this.navCtrl.navigateForward(['../nivel', { encender }]);
    } else if (encender === "2") {
      this.navCtrl.navigateForward(['../nivel', { encender }]);
    } else if (encender === "3") {
      this.navCtrl.navigateForward(['../nivel', { encender }]);
    } else if (encender === "4") {
      this.presentAlert(1);  // Mostrar Acordes Mayores
    } else if (encender === "5") {
      this.presentAlert(2);  // Mostrar Acordes Menores
    } else if (encender === "6") {
      this.presentAlert(3);  // Mostrar Escalas
    }
  }

  // Función para mostrar el alert con los acordes y escalas
  async presentAlert(dato: number) {
    const acordesSeleccionados = dato === 1 ? this.acordes : dato === 2 ? this.acordesM : [];
    const titulo = dato === 1 ? 'Acordes Mayores' : dato === 2 ? 'Acordes Menores' : 'Escalas';

    const slides = acordesSeleccionados
      .map(acorde => `
        <swiper-slide>
          <ion-card class="slide-card">
            <ion-img src="https://ik.imagekit.io/storageCrescendo${acorde}" alt="Acorde"></ion-img>
          </ion-card>
        </swiper-slide>
      `)
      .join('');

    const alert = await this.alertController.create({
      header: titulo,
      cssClass: 'custom-alert',
      message: `<swiper-container slides-per-view="1.2" space-between="10">${slides}</swiper-container>`
    });

    await alert.present();
  }
}