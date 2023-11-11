import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AtendimentoMeioInterface } from '../../types/atendimento-meio.interface';
import { AtendimentoMeioService } from '../../services/atendimento-meio.service';

@Component({
  selector: 'app-atendimento-meio',
  templateUrl: './atendimento-meio-lista.page.html',
  styleUrls: ['./atendimento-meio-lista.page.scss']
})
export class AtendimentoMeioPage implements OnInit {
  meios: AtendimentoMeioInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private atendimentoMeioService: AtendimentoMeioService
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
    this.atendimentoMeioService.getAtendimentosMeios().subscribe(
      (dados) => {
        this.meios = dados;
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

  confirmarExclusao(meio: AtendimentoMeioInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o meio de atendimento ${meio.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(meio),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(meio: AtendimentoMeioInterface) {
    if (meio.id) {
      this.atendimentoMeioService.excluir(meio.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o assunto ${meio.nome}`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
        }
      );
    }
  }
}
