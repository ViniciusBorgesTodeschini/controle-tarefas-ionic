import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtendimentoMeioInterface } from '../types/atendimento-meio.interface';
import { Page } from 'src/app/common/types/types';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoMeioService {

  private url = 'http://localhost:3000/atendimento-meio';

  constructor(
    private httpClient: HttpClient
  ) {}

  getAtendimentosMeios(fromObject?: any): Observable<Page<AtendimentoMeioInterface>> {

    const params = new HttpParams({ fromObject })
    const data = this.httpClient.get<Page<AtendimentoMeioInterface>>(this.url, { params });
    return data;
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getAtendimentoMeio(id: number): Observable<AtendimentoMeioInterface> {
    return this.httpClient.get<AtendimentoMeioInterface>(`${this.url}/${id}`);
  }

  private adicionar(atendimentoMeio: AtendimentoMeioInterface)  {
    return this.httpClient.post(this.url, atendimentoMeio);
  }

  private atualizar(atendimentoMeio: AtendimentoMeioInterface) {
    return this.httpClient.patch(`${this.url}/${atendimentoMeio.id}`, atendimentoMeio);
  }

  salvar(atendimentoMeio: AtendimentoMeioInterface) {
    if(atendimentoMeio.id) {
      return this.atualizar(atendimentoMeio);
    } else {
      return this.adicionar(atendimentoMeio);
    }
  }
}
