import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AprendizajePageRoutingModule } from './aprendizaje-routing.module';

import { AprendizajePage } from './aprendizaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AprendizajePageRoutingModule
  ],
  declarations: [AprendizajePage]
})
export class AprendizajePageModule {}
