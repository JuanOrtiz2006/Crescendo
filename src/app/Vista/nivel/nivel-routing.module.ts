import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NivelPage } from './nivel.page';

const routes: Routes = [
  {
    path: '',
    component: NivelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NivelPageRoutingModule {}
