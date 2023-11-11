import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AtendimentoInterface } from '../../types/atendimento.interface';
import { AtendimentoService } from '../../services/atendimento.service';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento-lista.page.html',
  styleUrls: ['./atendimento-lista.page.scss']
})
export class AtendimentoPage implements OnInit {
  atendimentos: AtendimentoInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private atendimentoService: AtendimentoService
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
    this.atendimentoService.getAtendimentos().subscribe(
      (dados) => {
        this.atendimentos = dados;
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

  confirmarExclusao(atendimento: AtendimentoInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir a atendimento ${atendimento.assunto}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(atendimento),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(atendimento: AtendimentoInterface) {
    if (atendimento.id) {
      this.atendimentoService.excluir(atendimento.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir a atendimento ${atendimento.assunto}`,
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
