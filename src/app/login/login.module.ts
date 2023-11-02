import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { LoginPage } from "./login.page";
import { CommonModule } from "@angular/common";
import { LoginRoutingModule } from "./login-routing.module";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        LoginRoutingModule,
        FormsModule
    ],
    declarations: [LoginPage]
})

export class LoginModule {}