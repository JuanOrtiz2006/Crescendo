import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BibliotecaAcordesPageRoutingModule } from './biblioteca-acordes-routing.module';

import { BibliotecaAcordesPage } from './biblioteca-acordes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BibliotecaAcordesPageRoutingModule
  ],
  declarations: [BibliotecaAcordesPage]
})
export class BibliotecaAcordesPageModule {}
