import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoresCadastroComponent } from './components/atendimento-meio-cadastro/atendimento-meio-cadastro.component';

import { AtendimentoMeioPage } from './components/atendimento-meio-lista/atendimento-meio-lista.page';

const routes: Routes = [
  {
    path: '',
    component: AtendimentoMeioPage
  },
  {
    path: 'cadastro',
    component: AutoresCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: AutoresCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoresPageRoutingModule {}
