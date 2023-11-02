import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'atendimento-assunto',
    loadChildren: () => import('./atendimento/atendimento-assunto/atendimento-assunto-routing.module').then( m => m.AtendimentoAssuntoPageRoutingModule)
  },  
  {
    path: 'atendimento-meio',
    loadChildren: () => import('./atendimento/atendimento-meio/atendimento-meio-routing.module').then( m => m.AtendimentoMeioPageRoutingModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
