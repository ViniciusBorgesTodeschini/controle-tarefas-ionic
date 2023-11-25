import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchInputService {
  private url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getItems(endpoint: string, prop: string, value:string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}/${endpoint}?${prop}_like=${value}`);
  }
}
