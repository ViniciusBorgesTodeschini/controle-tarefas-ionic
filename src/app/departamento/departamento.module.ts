import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { DepartamentoPageRoutingModule } from "./departamento-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { DepartamentoPage } from "./components/departamento-lista/departamento-lista.page";
import { DepartamentoCadastroComponent } from "./components/departamento-cadastro/departamento-cadastro.component";

@NgModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      IonicModule,
      DepartamentoPageRoutingModule,
      HttpClientModule
    ],
    declarations: [DepartamentoPage, DepartamentoCadastroComponent],
    exports:[DepartamentoPage]
  })
  export class DepartamentoPageModule {}
  