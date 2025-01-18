import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute
import { Database, ref, get, set } from '@angular/fire/database';
import { Storage } from '@ionic/storage-angular';
import { AlertController, ToastController, MenuController } from '@ionic/angular'; // Importar MenuController
import { NavController } from '@ionic/angular'; // Importación de NavController
import { AutenticacionService } from 'src/app/Servicio/autenticacion.service'; // Importación del servicio de autenticación

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  pagina:any;
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
    private route: ActivatedRoute, // Añadir ActivatedRoute
    private storage: Storage,
    private alertController: AlertController,
    private toastController: ToastController, // Añadir ToastController
    private navCtrl: NavController, // NavController para navegación sin animaciones
    private autenticacionService: AutenticacionService, // Servicio de autenticación
    private menu: MenuController // Añadir MenuController
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.pagina = params['avAction'];
      if (this.pagina === "1"){
        this.ConexionAlert()
      }
    });
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

  // Función para cerrar sesión y redirigir a la página de presentación
  async cerrarSesion() {
    await this.autenticacionService.cerrarSesion();
    await this.storage.clear();
    this.navCtrl.navigateRoot('/presentacion');
  }

  // Función para mostrar alerta de conexión
  async mostrarConexionAlerta() {
    const alert = await this.alertController.create({
      header: 'Verificación',
      inputs: [
        {
          name: 'contraseña',
          type: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Verificar',
          handler: async (data) => {
            try {
              const user = await this.autenticacionService.iniciarSesion(this.correo, data.contraseña);
              if (user) {
                this.mostrarAlertaEdicion();
              }
            } catch (error) {
              this.mostrarError('Contraseña incorrecta');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // Función para mostrar alerta de edición
  async mostrarAlertaEdicion() {
    const alert = await this.alertController.create({
      header: 'Conexión',
      inputs: [
        {
          name: 'red',
          type: 'text',
          placeholder: 'Red'
        },
        {
          name: 'contraseña',
          type: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (this.uid) {
              const redRef = ref(this.database, `red`);
              await set(redRef, {
                nombre: data.red.trim(),
                pin: data.contraseña.trim(),
                validacion: 1
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // Función para mostrar error
  async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Función para actualizar la variable notas en la base de datos
  async actualizarNotas() {
    await set(ref(this.database, 'Notas'), 99);
  }

  // Función para mostrar el toast
  async ConexionAlert() {
    const toast = await this.toastController.create({
      message: 'Para conectar a tu piano Crescendo, es necesario una conexión provisional de seguridad de nombre ESP32 y contraseña 123245. Para conectarte a otra red puede ir a las opciones en la parte superior.',
      position: 'bottom',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

  async ConexionValida() {
    const validacionRef = ref(this.database, 'red/validacion');
    const snapshot = await get(validacionRef);
    if (snapshot.exists() && snapshot.val() === 2) {
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Cambio de red realizada correctamente',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}