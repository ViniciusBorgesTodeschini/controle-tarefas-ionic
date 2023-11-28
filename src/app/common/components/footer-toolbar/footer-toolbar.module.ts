import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FooterToolbar } from './footer-toolbar.page';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {
  ActivatedRoute,
  RouteReuseStrategy,
  RouterModule,
} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [FooterToolbar],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  exports: [FooterToolbar],
})
export class FooterToolbarModule {}
