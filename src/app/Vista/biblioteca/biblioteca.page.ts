import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Database, ref, get } from '@angular/fire/database';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  uid: string | null = null;
  nombre: string = '';
  acordes = [
    '/Acordes/ADo.svg',
    '/Acordes/ARe.svg',
    '/Acordes/AMi.svg',
    '/Acordes/AFa.svg',
    '/Acordes/ASol.svg',
    '/Acordes/ALa.svg',
    '/Acordes/ASi.svg',
  ];
  acordesM = [
    '/Acordes/ADom.svg',
    '/Acordes/ARem.svg',
    '/Acordes/AMim.svg',
    '/Acordes/AFam.svg',
    '/Acordes/ASolm.svg',
    '/Acordes/ALam.svg',
    '/Acordes/ASim.svg',
  ];

  constructor(
    private database: Database,
    private router: Router,
    private alertController: AlertController,
    private storage: Storage
  ) {}

  async ngOnInit() {
    this.uid = await this.storage.get('id');
    if (this.uid) {
      const userRef = ref(this.database, `Usuarios/${this.uid}/nombre`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        this.nombre = snapshot.val();
      } else {
        console.log('No se encontró el nombre del usuario.');
      }
    }
  }

  irinicio() {
    // Redirige a la página de inicio directamente sin animación
    this.router.navigate(['../inicio'], { skipLocationChange: true });
  }

  async presentAlert(dato: number) {
    let acordesSeleccionados: string[] = [];
    let titulo = '';

    if (dato === 1) {
      acordesSeleccionados = this.acordes;
      titulo = 'Acordes Mayores';
    } else if (dato === 2) {
      acordesSeleccionados = this.acordesM;
      titulo = 'Acordes Menores';
    } else {
      acordesSeleccionados = [];
      titulo = 'Escalas'; // Para el dato 3
    }

    const slides = acordesSeleccionados
      .map(
        (acorde) => `
      <swiper-slide>
        <ion-card class="slide-card">
          <ion-img src="https://ik.imagekit.io/storageCrescendo${acorde}" alt="Acorde"></ion-img>
        </ion-card>
      </swiper-slide>
    `
      )
      .join('');

    const alert = await this.alertController.create({
      header: titulo,
      cssClass: 'custom-alert',
      message: `
      <swiper-container slides-per-view="1.2" space-between="10">
        ${slides}
      </swiper-container>
    `,
    });

    await alert.present();
  }
}
