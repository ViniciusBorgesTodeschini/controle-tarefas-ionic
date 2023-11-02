import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoAssuntoCadastroComponent } from './components/atendimento-assunto-cadastro/atendimento-assunto-cadastro.component';

import { AtendimentoAssuntoPage } from './components/atendimento-assunto-lista/atendimento-assunto-lista.page';

const routes: Routes = [
  {
    path: '',
    component: AtendimentoAssuntoPage
  },
  {
    path: 'cadastro',
    component: AtendimentoAssuntoCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: AtendimentoAssuntoCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtendimentoAssuntoPageRoutingModule {}
