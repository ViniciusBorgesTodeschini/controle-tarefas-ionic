import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoCadastroComponent } from './components/atendimento-cadastro/atendimento-cadastro.component';

import { AtendimentoPage } from './components/atendimento-lista/atendimento-lista.page';

const routes: Routes = [
  {
    path: '',
    component: AtendimentoPage
  },
  {
    path: 'cadastro',
    component: AtendimentoCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: AtendimentoCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtendimentoPageRoutingModule {}
