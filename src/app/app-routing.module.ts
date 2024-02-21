import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'presentacion',
    pathMatch: 'full'
  },
  {
    path: 'presentacion',
    loadChildren: () => import('./Vista/presentacion/presentacion.module').then( m => m.PresentacionPageModule)
  },
  {
    path: 'registro-usuario',
    loadChildren: () => import('./Vista/registro-usuario/registro-usuario.module').then( m => m.RegistroUsuarioPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./Vista/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'biblioteca',
    loadChildren: () => import('./Vista/biblioteca/biblioteca.module').then( m => m.BibliotecaPageModule)
  },
  {
    path: 'biblioteca-acordes',
    loadChildren: () => import('./Vista/biblioteca-acordes/biblioteca-acordes.module').then( m => m.BibliotecaAcordesPageModule)
  },
  {
    path: 'escalas',
    loadChildren: () => import('./Vista/escalas/escalas.module').then( m => m.EscalasPageModule)
  },
  {
    path: 'nivel',
    loadChildren: () => import('./Vista/nivel/nivel.module').then( m => m.NivelPageModule)
  },
  {
    path: 'aprendizaje',
    loadChildren: () => import('./Vista/aprendizaje/aprendizaje.module').then( m => m.AprendizajePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
