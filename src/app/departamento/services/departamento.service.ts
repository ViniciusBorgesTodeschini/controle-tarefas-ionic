import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartamentoInterface } from '../types/departamento.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private url = 'http://localhost:3000/departamento';

  constructor(
    private httpClient: HttpClient
  ) {}

  getAtendimentosMeios(): Observable<DepartamentoInterface[]> {
    return this.httpClient.get<DepartamentoInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getDepartamento(id: number): Observable<DepartamentoInterface> {
    return this.httpClient.get<DepartamentoInterface>(`${this.url}/${id}`);
  }

  private adicionar(departamento: DepartamentoInterface)  {
    return this.httpClient.post(this.url, departamento);
  }

  private atualizar(departamento: DepartamentoInterface) {
    return this.httpClient.put(`${this.url}/${departamento.id}`, departamento);
  }

  salvar(departamento: DepartamentoInterface) {
    if(departamento.id) {
      return this.atualizar(departamento);
    } else {
      return this.adicionar(departamento);
    }
  }
}
