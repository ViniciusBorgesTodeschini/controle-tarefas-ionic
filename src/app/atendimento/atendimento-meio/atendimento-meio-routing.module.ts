import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoMeioCadastroComponent } from './components/atendimento-meio-cadastro/atendimento-meio-cadastro.component';

import { AtendimentoMeioPage } from './components/atendimento-meio-lista/atendimento-meio-lista.page';

const routes: Routes = [
  {
    path: '',
    component: AtendimentoMeioPage
  },
  {
    path: 'cadastro',
    component: AtendimentoMeioCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: AtendimentoMeioCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtendimentoMeioPageRoutingModule {}
