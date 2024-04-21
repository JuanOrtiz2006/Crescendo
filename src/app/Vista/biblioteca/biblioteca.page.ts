import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  messageHtml:any;
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
  constructor(private router: Router, private route: ActivatedRoute, private alertController:AlertController) {}
  ngOnInit() {}
  irInicio(pagina:string) {
    this.router.navigate(['../inicio']);
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