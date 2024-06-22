import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioInterface } from '../types/usuario.interface';
import { Page } from 'src/app/common/types/types';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'http://localhost:3000/usuario';

  constructor(
    private httpClient: HttpClient
  ) {}

  getUsuarios(fromObject?: any): Observable<Page<UsuarioInterface>> {
    const params = new HttpParams({ fromObject })
    const data = this.httpClient.get<Page<UsuarioInterface>>(this.url, { params });
    return data;
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getUsuario(id: number): Observable<UsuarioInterface> {
    return this.httpClient.get<UsuarioInterface>(`${this.url}/${id}`);
  }

  private adicionar(usuario: UsuarioInterface)  {
    return this.httpClient.post(this.url, usuario);
  }

  private atualizar(usuario: UsuarioInterface) {
    return this.httpClient.patch(`${this.url}/${usuario.id}`, usuario);
  }

  salvar(usuario: UsuarioInterface) {
    if(usuario.id) {
      return this.atualizar(usuario);
    } else {
      return this.adicionar(usuario);
    }
  }
}
