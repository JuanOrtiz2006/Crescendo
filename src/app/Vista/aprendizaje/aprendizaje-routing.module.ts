import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AprendizajePage } from './aprendizaje.page';

const routes: Routes = [
  {
    path: '',
    component: AprendizajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AprendizajePageRoutingModule {}
