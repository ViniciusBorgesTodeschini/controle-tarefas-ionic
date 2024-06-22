import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartamentoInterface } from '../types/departamento.interface';
import { Page } from 'src/app/common/types/types';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private url = 'http://localhost:3000/departamento';

  constructor(
    private httpClient: HttpClient
  ) {}

  getDepartamentos(fromObject?: any): Observable<Page<DepartamentoInterface>> {
    const params = new HttpParams({ fromObject })
    const data = this.httpClient.get<Page<DepartamentoInterface>>(this.url, { params });
    return data;
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
    return this.httpClient.patch(`${this.url}/${departamento.id}`, departamento);
  }

  salvar(departamento: DepartamentoInterface) {
    if(departamento.id) {
      return this.atualizar(departamento);
    } else {
      return this.adicionar(departamento);
    }
  }
}
