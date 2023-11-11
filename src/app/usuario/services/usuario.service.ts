import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioInterface } from '../types/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'http://localhost:3000/usuario';

  constructor(
    private httpClient: HttpClient
  ) {}

  getUsuarios(): Observable<UsuarioInterface[]> {
    return this.httpClient.get<UsuarioInterface[]>(this.url);
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
    return this.httpClient.put(`${this.url}/${usuario.id}`, usuario);
  }

  salvar(usuario: UsuarioInterface) {
    if(usuario.id) {
      return this.atualizar(usuario);
    } else {
      return this.adicionar(usuario);
    }
  }
}
