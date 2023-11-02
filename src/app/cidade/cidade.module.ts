import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { CidadePageRoutingModule } from './cidade-routing.module';

import { CidadesPage } from './components/cidade-lista/cidade-lista.page';
import { CidadesCadastroComponent } from './components/cidade-cadastro/cidade-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    CidadePageRoutingModule,
    HttpClientModule,
  ],
  declarations: [CidadesPage, CidadesCadastroComponent]
})
export class CidadesPageModule {}
