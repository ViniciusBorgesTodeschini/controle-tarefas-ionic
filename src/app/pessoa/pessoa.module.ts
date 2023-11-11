import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { PessoaPageRoutingModule } from "./pessoa-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { PessoaPage } from "./components/pessoa-lista/pessoa-lista.page";
import { PessoaCadastroComponent } from "./components/pessoa-cadastro/pessoa-cadastro.component";

@NgModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      IonicModule,
      PessoaPageRoutingModule,
      HttpClientModule
    ],
    declarations: [PessoaPage, PessoaCadastroComponent],
    exports:[PessoaPage]
  })
  export class PessoaPageModule {}
  