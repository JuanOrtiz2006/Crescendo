import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Database, ref, get, set } from '@angular/fire/database';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

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

  nivel = [
    "/Portadas/portada_Principiante.svg",
    "/Portadas/portada_Intermedio.svg",
    "/Portadas/portada_Experto.svg"
  ];

  portada = [
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
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.uid = await this.storage.get('id');
    const userRef = ref(this.database, `Usuarios/${this.uid}/nombre`);
    const snapshot = await get(userRef);
    
    if (snapshot.exists()) {
      this.nombre = snapshot.val();
      await this.storage.set('usuario', this.nombre);
    } else {
      console.error('No se encontró el nombre del usuario');
    }
  }

  onSegmentChange(event: any) {
    this.segmentValue = event.detail.value;
  }

  getImagenes(): string[] {
    return this.segmentValue === 'Niveles' ? this.nivel : this.portada;
  }

  async presentAlert(dato: number) {
    const acordesSeleccionados = this.getAcordes(dato);
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

  private getAcordes(dato: number): string[] {
    if (dato === 1) return this.acordes;
    if (dato === 2) return this.acordesM;
    return [];
  }

  irPagina(i: number) {
    const rutas = ['../nivel1', '../nivel2', '../nivel3'];
    if (i >= 1 && i <= 3) {
      this.router.navigate([rutas[i - 1]]);
    }
  }
}
