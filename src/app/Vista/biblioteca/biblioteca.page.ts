import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  pagina: string="";
  notas =['../../../assets/Imagenes/Do Mayor.svg', 
          '../../../assets/Imagenes/Re Mayor.svg', 
          '../../../assets/Imagenes/Mi Mayor.svg', 
          '../../../assets/Imagenes/Fa Mayor.svg', 
          '../../../assets/Imagenes/Sol Mayor.svg', 
          '../../../assets/Imagenes/La Mayor.svg', 
          '../../../assets/Imagenes/Si Mayor.svg'];
  acordes=['../../../assets/Imagenes/Do Mayor.svg', 
          '../../../assets/Imagenes/Re Mayor.svg', 
          '../../../assets/Imagenes/Mi Mayor.svg', 
          '../../../assets/Imagenes/Fa Mayor.svg', 
          '../../../assets/Imagenes/Sol Mayor.svg', 
          '../../../assets/Imagenes/La Mayor.svg', 
          '../../../assets/Imagenes/Si Mayor.svg'];
  acordesM=['../../../assets/Imagenes/Do menor.svg', 
            '../../../assets/Imagenes/Re Menor.svg', 
            '../../../assets/Imagenes/Mi Menor.svg', 
            '../../../assets/Imagenes/Fa Menor.svg', 
            '../../../assets/Imagenes/Sol Menor.svg', 
            '../../../assets/Imagenes/La Menor.svg', 
            '../../../assets/Imagenes/Si Menor.svg'];
            
  constructor(private router: Router, private route: ActivatedRoute, private alertController:AlertController) {}
  ngOnInit() {}
  irPagina(serie: string) {
    this.router.navigate(['../biblioteca-acordes', { serie: serie }]);
  }
  irPagina2(serie: string) {
    this.router.navigate(['../aprendizaje', { serie: serie }]);
  }
  irInicio(pagina:string) {
    this.router.navigate(['../inicio', { pagina: pagina }]);
  }

  async presentAlert(dato: number) {
    if(dato==1)
      {
        const messageHtml = this.acordes
        .map((acorde) => `<swiper-slide><img src="${acorde}"></swiper-slide>`)
        .join('');
        const alert = await this.alertController.create({
        message: `<swiper-container>${messageHtml}</swiper-container>`,});
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
  }
}