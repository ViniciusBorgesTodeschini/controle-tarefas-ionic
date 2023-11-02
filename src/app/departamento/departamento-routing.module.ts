import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartamentoCadastroComponent } from './components/departamento-cadastro/departamento-cadastro.component';

import { DepartamentoPage } from './components/departamento-lista/departamento-lista.page';

const routes: Routes = [
  {
    path: '',
    component: DepartamentoPage
  },
  {
    path: 'cadastro',
    component: DepartamentoCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: DepartamentoCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartamentoPageRoutingModule {}
