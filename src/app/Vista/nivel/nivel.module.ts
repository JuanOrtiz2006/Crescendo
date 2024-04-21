import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NivelPageRoutingModule } from './nivel-routing.module';
import { NivelPage } from './nivel.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NivelPageRoutingModule
  ],
  declarations: [NivelPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NivelPageModule {}
