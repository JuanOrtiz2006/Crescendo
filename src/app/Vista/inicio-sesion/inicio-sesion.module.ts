import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InicioSesionPageRoutingModule } from './inicio-sesion-routing.module';
import { InicioSesionPage } from './inicio-sesion.page';
import { ImagekitioAngularModule } from 'imagekitio-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioSesionPageRoutingModule,
    ImagekitioAngularModule.forRoot({
      publicKey: "public_2MFZoPG3dyoNnT1RznXsHzQVqQM=",
      urlEndpoint:"https://ik.imagekit.io/storageCrescendo",
      })
  ],
  declarations: [InicioSesionPage]
})
export class InicioSesionPageModule {}
