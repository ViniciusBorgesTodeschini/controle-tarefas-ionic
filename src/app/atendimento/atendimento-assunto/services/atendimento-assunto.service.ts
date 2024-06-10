import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtendimentoAssuntoInterface } from '../types/atendimento-assunto.interface';
import { Page } from 'src/app/common/types/types';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoAssuntoService {

  private url = 'http://localhost:3000/atendimento-assunto';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAtendimentosAssuntos(fromObject?: any): Observable<Page<AtendimentoAssuntoInterface>> {

    const params = new HttpParams({ fromObject })
    const data = this.httpClient.get<Page<AtendimentoAssuntoInterface>>(this.url, { params });
    return data;
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getAtendimentoAssunto(id: number,): Observable<AtendimentoAssuntoInterface> {
    return this.httpClient.get<AtendimentoAssuntoInterface>(`${this.url}/${id}`);
  }

  private adicionar(atendimentoAssunto: AtendimentoAssuntoInterface) {
    return this.httpClient.post(this.url, atendimentoAssunto);
  }

  private atualizar(atendimentoAssunto: AtendimentoAssuntoInterface) {
    return this.httpClient.patch(`${this.url}/${atendimentoAssunto.id}`, atendimentoAssunto);
  }

  salvar(atendimentoAssunto: AtendimentoAssuntoInterface) {
    if (atendimentoAssunto.id) {
      return this.atualizar(atendimentoAssunto);
    } else {
      return this.adicionar(atendimentoAssunto);
    }
  }
}
