import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscalasPageRoutingModule } from './escalas-routing.module';

import { EscalasPage } from './escalas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscalasPageRoutingModule
  ],
  declarations: [EscalasPage]
})
export class EscalasPageModule {}
