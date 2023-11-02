import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtendimentoAssuntoInterface } from '../types/atendimento-assunto.interface';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoAssuntoService {

  private url = 'http://localhost:3000/atendimento-assunto';

  constructor(
    private httpClient: HttpClient
  ) {}

  getAtendimentosAssuntos(): Observable<AtendimentoAssuntoInterface[]> {
    return this.httpClient.get<AtendimentoAssuntoInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getAtendimentoAssunto(id: number): Observable<AtendimentoAssuntoInterface> {
    return this.httpClient.get<AtendimentoAssuntoInterface>(`${this.url}/${id}`);
  }

  private adicionar(atendimentoAssunto: AtendimentoAssuntoInterface)  {
    return this.httpClient.post(this.url, atendimentoAssunto);
  }

  private atualizar(atendimentoAssunto: AtendimentoAssuntoInterface) {
    return this.httpClient.put(`${this.url}/${atendimentoAssunto.id}`, atendimentoAssunto);
  }

  salvar(atendimentoAssunto: AtendimentoAssuntoInterface) {
    if(atendimentoAssunto.id) {
      return this.atualizar(atendimentoAssunto);
    } else {
      return this.adicionar(atendimentoAssunto);
    }
  }
}
