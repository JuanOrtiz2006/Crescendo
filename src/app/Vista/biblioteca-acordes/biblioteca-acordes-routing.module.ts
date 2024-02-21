import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BibliotecaAcordesPage } from './biblioteca-acordes.page';

const routes: Routes = [
  {
    path: '',
    component: BibliotecaAcordesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BibliotecaAcordesPageRoutingModule {}
