import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { CidadePageRoutingModule } from './cidade-routing.module';

import { CidadePage } from './components/cidade-lista/cidade-lista.page';
import { CidadeCadastroComponent } from './components/cidade-cadastro/cidade-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    CidadePageRoutingModule,
    HttpClientModule
  ],
  declarations: [CidadePage, CidadeCadastroComponent]
})
export class CidadePageModule {}
