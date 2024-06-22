import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PessoaInterface } from '../types/pessoa.interface';
import { Page } from 'src/app/common/types/types';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private url = 'http://localhost:3000/pessoa';

  constructor(
    private httpClient: HttpClient
  ) {}

  getPessoas(fromObject?: any): Observable<Page<PessoaInterface>> {
    const params = new HttpParams({ fromObject })
    const data = this.httpClient.get<Page<PessoaInterface>>(this.url, { params });
    return data;
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getPessoa(id: number): Observable<PessoaInterface> {
    return this.httpClient.get<PessoaInterface>(`${this.url}/${id}`);
  }

  private adicionar(pessoa: PessoaInterface)  {
    return this.httpClient.post(this.url, pessoa);
  }

  private atualizar(pessoa: PessoaInterface) {
    return this.httpClient.patch(`${this.url}/${pessoa.id}`, pessoa);
  }

  salvar(pessoa: PessoaInterface) {
    if(pessoa.id) {
      return this.atualizar(pessoa);
    } else {
      return this.adicionar(pessoa);
    }
  }
}
