import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AtendimentoMeioPageRoutingModule } from "./atendimento-meio-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AtendimentoMeioPage } from "./components/atendimento-meio-lista/atendimento-meio-lista.page";
import { AtendimentoMeioCadastroComponent } from "./components/atendimento-meio-cadastro/atendimento-meio-cadastro.component";
import { FooterToolbarModule } from "src/app/common/components/footer-toolbar/footer-toolbar.module";
import { SearchInputModule } from "src/app/common/components/seach-input/search-input.module";

@NgModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      IonicModule,
      AtendimentoMeioPageRoutingModule,
      HttpClientModule,
      FooterToolbarModule,
      SearchInputModule
    ],
    declarations: [AtendimentoMeioPage, AtendimentoMeioCadastroComponent],
    exports:[AtendimentoMeioPage]
  })
  export class AtendimentoMeioPageModule {}
  