import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AtendimentoPageRoutingModule } from "./atendimento-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AtendimentoPage } from "./components/atendimento-lista/atendimento-lista.page";
import { AtendimentoCadastroComponent } from "./components/atendimento-cadastro/atendimento-cadastro.component";
import { FooterToolbarModule } from "../common/components/footer-toolbar/footer-toolbar.module";
import { SearchInputModule } from "../common/components/seach-input/search-input.module";

@NgModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      IonicModule,
      AtendimentoPageRoutingModule,
      HttpClientModule,
      FooterToolbarModule,
      SearchInputModule
    ],
    declarations: [AtendimentoPage, AtendimentoCadastroComponent],
    exports:[AtendimentoPage]
  })
  export class AtendimentoPageModule {}
  