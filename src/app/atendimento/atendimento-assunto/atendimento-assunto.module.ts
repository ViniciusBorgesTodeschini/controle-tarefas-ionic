import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AtendimentoAssuntoPageRoutingModule } from "./atendimento-assunto-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AtendimentoAssuntoPage } from "./components/atendimento-assunto-lista/atendimento-assunto-lista.page";
import { AtendimentoAssuntoCadastroComponent } from "./components/atendimento-assunto-cadastro/atendimento-assunto-cadastro.component";
import { FooterToolbarModule } from "src/app/common/components/footer-toolbar/footer-toolbar.module";
import { SearchInputModule } from "src/app/common/components/seach-input/search-input.module";

@NgModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      IonicModule,
      AtendimentoAssuntoPageRoutingModule,
      HttpClientModule,
      FooterToolbarModule,
      SearchInputModule
    ],
    declarations: [AtendimentoAssuntoPage, AtendimentoAssuntoCadastroComponent],
    exports:[AtendimentoAssuntoPage]
  })
  export class AtendimentoAssuntoPageModule {}
  