import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { FooterToolbar } from "./footer-toolbar.page";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule
    ],
    declarations: [FooterToolbar],
    exports: [FooterToolbar]
  })
  export class FooterToolbarModule {}