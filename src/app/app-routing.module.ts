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
    loadChildren: () => import('./atendimento/atendimento-assunto/atendimento-assunto.module').then( m => m.AtendimentoAssuntoPageModule)
  },  
  {
    path: 'atendimento-meio',
    loadChildren: () => import('./atendimento/atendimento-meio/atendimento-meio.module').then( m => m.AtendimentoMeioPageModule)
  },  
  {
    path: 'departamento',
    loadChildren: () => import('./departamento/departamento.module').then( m => m.DepartamentoPageModule)
  },  
  {
    path: 'cidade',
    loadChildren: () => import('./cidade/cidade.module').then( m => m.CidadesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
