import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { UsuarioPageRoutingModule } from "./usuario-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { UsuarioPage } from "./components/usuario-lista/usuario-lista.page";
import { UsuarioCadastroComponent } from "./components/usuario-cadastro/usuario-cadastro.component";
import { FooterToolbarModule } from "../common/components/footer-toolbar/footer-toolbar.module";
import { SearchInputModule } from "../common/components/seach-input/search-input.module";

@NgModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      IonicModule,
      UsuarioPageRoutingModule,
      HttpClientModule,
      FooterToolbarModule,
      SearchInputModule
    ],
    declarations: [UsuarioPage, UsuarioCadastroComponent],
    exports:[UsuarioPage]
  })
  export class UsuarioPageModule {}
  