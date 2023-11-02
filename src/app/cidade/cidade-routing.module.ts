import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CidadesCadastroComponent } from './components/cidade-cadastro/cidade-cadastro.component';

import { CidadesPage } from './components/cidade-lista/cidade-lista.page';

const routes: Routes = [
  {
    path: '',
    component: CidadesPage
  },
  {
    path: 'cadastro',
    component: CidadesCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: CidadesCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CidadePageRoutingModule {}
