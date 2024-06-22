import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtendimentoInterface } from '../types/atendimento.interface';
import { Page } from 'src/app/common/types/types';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  private url = 'http://localhost:3000/atendimento';

  constructor(
    private httpClient: HttpClient
  ) {}

  getAtendimentos(fromObject?: any): Observable<Page<AtendimentoInterface>> {

    const params = new HttpParams({ fromObject })
    const data = this.httpClient.get<Page<AtendimentoInterface>>(this.url, { params });
    return data;
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getAtendimento(id: number): Observable<AtendimentoInterface> {
    return this.httpClient.get<AtendimentoInterface>(`${this.url}/${id}`);
  }

  private adicionar(atendimento: AtendimentoInterface)  {
    return this.httpClient.post(this.url, atendimento);
  }

  private atualizar(atendimento: AtendimentoInterface) {
    return this.httpClient.patch(`${this.url}/${atendimento.id}`, atendimento);
  }

  salvar(atendimento: AtendimentoInterface) {
    if(atendimento.id) {
      return this.atualizar(atendimento);
    } else {
      return this.adicionar(atendimento);
    }
  }
}
