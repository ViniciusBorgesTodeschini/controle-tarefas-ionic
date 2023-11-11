import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CidadeCadastroComponent } from './components/cidade-cadastro/cidade-cadastro.component';

import { CidadePage } from './components/cidade-lista/cidade-lista.page';

const routes: Routes = [
  {
    path: '',
    component: CidadePage
  },
  {
    path: 'cadastro',
    component: CidadeCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: CidadeCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CidadePageRoutingModule {}
