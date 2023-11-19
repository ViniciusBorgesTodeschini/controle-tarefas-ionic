import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { PessoaPageRoutingModule } from "./pessoa-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { PessoaPage } from "./components/pessoa-lista/pessoa-lista.page";
import { PessoaCadastroComponent } from "./components/pessoa-cadastro/pessoa-cadastro.component";
import { FooterToolbarModule } from "../common/components/footer-toolbar/footer-toolbar.module";
import { SearchInputModule } from "../common/components/seach-input/search-input.module";

@NgModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      IonicModule,
      PessoaPageRoutingModule,
      HttpClientModule,
      FooterToolbarModule,
      SearchInputModule
    ],
    declarations: [PessoaPage, PessoaCadastroComponent],
    exports:[PessoaPage]
  })
  export class PessoaPageModule {}
  