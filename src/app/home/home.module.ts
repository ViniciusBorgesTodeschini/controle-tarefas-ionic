import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FooterToolbarModule } from '../common/components/footer-toolbar/footer-toolbar.module';
import {  SearchInputModule } from '../common/components/seach-input/search-input.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FooterToolbarModule,
    SearchInputModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
