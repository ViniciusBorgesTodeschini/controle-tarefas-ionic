import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AtendimentoAssuntoPageRoutingModule } from "./atendimento-assunto-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AtendimentoAssuntoPage } from "./components/atendimento-assunto-lista/atendimento-assunto-lista.page";
import { AtendimentoAssuntoCadastroComponent } from "./components/atendimento-assunto-cadastro/atendimento-assunto-cadastro.component";

@NgModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      IonicModule,
      AtendimentoAssuntoPageRoutingModule,
      HttpClientModule,
    ],
    declarations: [AtendimentoAssuntoPage, AtendimentoAssuntoCadastroComponent],
    exports:[AtendimentoAssuntoPage]
  })
  export class AtendimentoAssuntoPageModule {}
  