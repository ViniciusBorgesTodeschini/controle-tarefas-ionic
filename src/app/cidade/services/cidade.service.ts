import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CidadeInterface } from '../types/cidade.interface';
import { Page } from 'src/app/common/types/types';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private url = 'http://localhost:3000/cidade';

  constructor(
    private httpClient: HttpClient
  ) {}

  getCidades(fromObject?: any): Observable<Page<CidadeInterface>> {
    const params = new HttpParams({ fromObject })
    const data = this.httpClient.get<Page<CidadeInterface>>(this.url, { params });
    return data;
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getCidade(id: number): Observable<CidadeInterface> {
    return this.httpClient.get<CidadeInterface>(`${this.url}/${id}`);
  }

  private adicionar(cidade: CidadeInterface)  {
    return this.httpClient.post(this.url, cidade);
  }

  private atualizar(cidade: CidadeInterface) {
    return this.httpClient.patch(`${this.url}/${cidade.id}`, cidade);
  }

  salvar(cidade: CidadeInterface) {
    if(cidade.id) {
      return this.atualizar(cidade);
    } else {
      return this.adicionar(cidade);
    }
  }
}
