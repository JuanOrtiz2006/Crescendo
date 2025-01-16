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
    path: 'nivel',
    loadChildren: () => import('./Vista/nivel/nivel.module').then( m => m.NivelPageModule)
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./Vista/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
