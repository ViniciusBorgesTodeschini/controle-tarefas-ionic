import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { UsuarioInterface } from '../../types/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario-lista.page.html',
  styleUrls: ['./usuario-lista.page.scss']
})
export class UsuarioPage implements OnInit {
  usuarios: UsuarioInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private usuarioService: UsuarioService
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
        this.usuarios = dados;
      },
      (erro) => {
        console.error(erro);
      }
    );
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
          this.toastController
            .create({
              message: `Não foi possível excluir a usuario ${usuario.nome}`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
        }
      );
    }
  }

  setUsuarios(event: any) {
    this.usuarios = event;
  }
}
