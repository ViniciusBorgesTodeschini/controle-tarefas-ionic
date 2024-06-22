import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { UsuarioInterface } from '../../types/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { Page } from 'src/app/common/types/types';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario-lista.page.html',
  styleUrls: ['./usuario-lista.page.scss']
})
export class UsuarioPage implements OnInit {
  usuarios: UsuarioInterface[] = [];
  page: Page<UsuarioInterface> = {
    list: [],
    page: 1,
    rpp: 10,
    totalCount: 0
  };

  constructor(
    private alertController: AlertController,
    private usuarioService: UsuarioService,
    private alertService: AlertService
  ) {}

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.listar();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ngOnInit() {}

  listar() {
    this.usuarioService.getUsuarios().subscribe(
      (dados) => {
        this.page = dados;
        this.usuarios = dados.list;
      },
      (erro) => {
        console.error(erro);
        this.alertService.error('Erro ao carregar listagem de usuários');
      }
    );
  }

  changePage() {
    const params = {
      page: this.page.page + 1,
      rpp: 10
    }
    this.usuarioService.getUsuarios(params).subscribe(
      (dados) => {
        this.page = dados;
        this.usuarios.push(...dados.list);
      },
      (erro) => {
        console.error(erro);
      }
    )
  }

  paginate(ev: any) {
    setTimeout(() => {
      this.changePage();
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }

  confirmarExclusao(usuario: UsuarioInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir a usuario ${usuario.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(usuario),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(usuario: UsuarioInterface) {
    if (usuario.id) {
      this.usuarioService.excluir(usuario.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.alertService.error(`Não foi possível excluir o usuário ${usuario.nome}`);
        }
      );
    }
  }

  setUsuarios(event: any) {
    this.usuarios = event;
  }
}
