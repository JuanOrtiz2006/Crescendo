import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Database, object, ref, set,get } from '@angular/fire/database';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  messageHtml:any;
  uid: string | null = null; // Cambiado a tipo string o null
  nombre: string = ''; // Cambiado a tipo string
  private routeSub: any; // Variable para manejar la suscripción a la ruta
  acordes=['../../../assets/Imagenes/Do.svg', 
          '../../../assets/Imagenes/Re.svg', 
          '../../../assets/Imagenes/Mi.svg', 
          '../../../assets/Imagenes/Fa.svg', 
          '../../../assets/Imagenes/Sol.svg', 
          '../../../assets/Imagenes/La.svg', 
          '../../../assets/Imagenes/Si.svg'];
  acordesM=['../../../assets/Imagenes/Dom.svg', 
            '../../../assets/Imagenes/Rem.svg', 
            '../../../assets/Imagenes/Mim.svg', 
            '../../../assets/Imagenes/Fam.svg', 
            '../../../assets/Imagenes/Solm.svg', 
            '../../../assets/Imagenes/Lam.svg', 
            '../../../assets/Imagenes/Sim.svg'];
  constructor(private database:Database, private router: Router, private route: ActivatedRoute, private alertController:AlertController) {}
  ngOnInit() {
    // Suscríbete a los parámetros de la ruta para obtener el uid
    this.routeSub = this.route.params.subscribe(async params => {
      this.uid = params['uid'];
      
      if (this.uid) {
        // Usa el uid para leer el nombre del usuario de la base de datos
        const userRef = ref(this.database, `Usuarios/${this.uid}/nombre`);
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

  // Función para navegar a la página de inicio
  irInicio(pagina:string) {
    // Asegúrate de pasar `uid` y `nombre` como parámetros si es necesario
    this.router.navigate(['../inicio', { uid: this.uid, nombre: this.nombre }]);
  }
  async presentAlert(dato: number) {
    if(dato==1)
      {
        this.messageHtml = this.acordes.map((acorde) => `<swiper-slide><img src="${acorde}"></swiper-slide>`);
        const alert = await this.alertController.create({
        message: `<swiper-container>${this.messageHtml}</swiper-container>`,});
        await alert.present();
      }
    if(dato==2)
      {
        const messageHtml = this.acordesM
        .map((acordem) => `<swiper-slide><img src="${acordem}"></swiper-slide>`)
        .join('');
        const alert = await this.alertController.create({
        message: `<swiper-container>${messageHtml}</swiper-container>`,});
        await alert.present();
      }
    if(dato==3)
      {
      }

      console.log(this.messageHtml);
  }
}