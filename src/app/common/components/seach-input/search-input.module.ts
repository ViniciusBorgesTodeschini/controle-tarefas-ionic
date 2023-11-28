import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SearchInput } from "./search-input";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
    ],
    declarations: [SearchInput],
    exports: [SearchInput]
  })

export class SearchInputModule {}