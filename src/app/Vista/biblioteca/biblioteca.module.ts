import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BibliotecaPageRoutingModule } from './biblioteca-routing.module';
import { BibliotecaPage } from './biblioteca.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ImagekitioAngularModule } from 'imagekitio-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BibliotecaPageRoutingModule,
    ImagekitioAngularModule.forRoot({
      publicKey: "public_2MFZoPG3dyoNnT1RznXsHzQVqQM=",
      urlEndpoint:"https://ik.imagekit.io/storageCrescendo",
      })
  ],
  declarations: [BibliotecaPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class BibliotecaPageModule {}