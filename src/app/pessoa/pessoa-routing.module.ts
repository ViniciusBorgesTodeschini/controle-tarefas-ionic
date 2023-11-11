import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoaCadastroComponent } from './components/pessoa-cadastro/pessoa-cadastro.component';

import { PessoaPage } from './components/pessoa-lista/pessoa-lista.page';

const routes: Routes = [
  {
    path: '',
    component: PessoaPage
  },
  {
    path: 'cadastro',
    component: PessoaCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: PessoaCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PessoaPageRoutingModule {}
