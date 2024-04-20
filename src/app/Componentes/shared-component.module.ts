import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComInicioComponent } from './com-inicio/com-inicio.component';
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [ComInicioComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ComInicioComponent
  ]
})
export class SharedComponentModule { }
