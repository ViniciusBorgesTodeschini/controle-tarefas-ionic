import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchInputService } from './services/search-input.service';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.html',
  styleUrls: ['./search-input.scss'],
})
export class SearchInput {

  @Input() url: string = '';
  @Input() propriedade: string = '';
  @Output() afterLoad: EventEmitter<any> = new EventEmitter();
  constructor(private searchInputService: SearchInputService) {
    
  }


  filter(value: any) {
    this.searchInputService.getItems(this.url, this.propriedade, value).subscribe(result => {
      this.afterLoad.emit(result)
    })
  }
}
