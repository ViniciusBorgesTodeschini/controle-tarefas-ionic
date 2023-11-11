import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtendimentoInterface } from '../types/atendimento.interface';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  private url = 'http://localhost:3000/atendimento';

  constructor(
    private httpClient: HttpClient
  ) {}

  getAtendimentos(): Observable<AtendimentoInterface[]> {
    return this.httpClient.get<AtendimentoInterface[]>(this.url);
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
    return this.httpClient.put(`${this.url}/${atendimento.id}`, atendimento);
  }

  salvar(atendimento: AtendimentoInterface) {
    if(atendimento.id) {
      return this.atualizar(atendimento);
    } else {
      return this.adicionar(atendimento);
    }
  }
}
