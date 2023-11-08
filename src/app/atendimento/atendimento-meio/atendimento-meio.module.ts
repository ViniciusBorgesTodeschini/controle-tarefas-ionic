import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AtendimentoMeioPageRoutingModule } from "./atendimento-meio-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AtendimentoMeioPage } from "./components/atendimento-meio-lista/atendimento-meio-lista.page";
import { AtendimentoMeioCadastroComponent } from "./components/atendimento-meio-cadastro/atendimento-meio-cadastro.component";

@NgModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      IonicModule,
      AtendimentoMeioPageRoutingModule,
      HttpClientModule
    ],
    declarations: [AtendimentoMeioPage, AtendimentoMeioCadastroComponent],
    exports:[AtendimentoMeioPage]
  })
  export class AtendimentoMeioPageModule {}
  