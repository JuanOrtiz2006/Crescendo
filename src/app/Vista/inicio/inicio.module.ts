import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { ImagekitioAngularModule } from 'imagekitio-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    ImagekitioAngularModule.forRoot({
          publicKey: "public_2MFZoPG3dyoNnT1RznXsHzQVqQM=",
          urlEndpoint:"https://ik.imagekit.io/storageCrescendo",
          })
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
