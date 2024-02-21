import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BibliotecaPage } from './biblioteca.page';

const routes: Routes = [
  {
    path: '',
    component: BibliotecaPage,
    children: [
      
      {
        path: 'biblioteca-acordes',
        loadChildren: () => import('../biblioteca-acordes/biblioteca-acordes.module').then( m => m.BibliotecaAcordesPageModule)
      },
      {
        path: 'escalas',
        loadChildren: () => import('../escalas/escalas.module').then( m => m.EscalasPageModule)
      }
        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BibliotecaPageRoutingModule {}
