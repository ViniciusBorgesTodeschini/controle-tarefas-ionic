import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { AtendimentoAssuntoInterface } from '../../types/atendimento-assunto.interface';
import { AtendimentoAssuntoService } from '../../services/atendimento-assunto.service';

@Component({
  selector: 'app-atendimento-assunto',
  templateUrl: './atendimento-assunto-lista.page.html',
  styleUrls: ['./atendimento-assunto-lista.page.scss']
})
export class AtendimentoAssuntoPage implements OnInit {
  assuntos: AtendimentoAssuntoInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private atendimentoAssuntoService: AtendimentoAssuntoService,
    private menuCtrl: MenuController
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
    this.atendimentoAssuntoService.getAtendimentosAssuntos().subscribe(
      (dados) => {
        this.assuntos = dados;
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

  confirmarExclusao(assunto: AtendimentoAssuntoInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o assunto ${assunto.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(assunto),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(assunto: AtendimentoAssuntoInterface) {
    if (assunto.id) {
      this.atendimentoAssuntoService.excluir(assunto.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o assunto ${assunto.nome}`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
        }
      );
    }
  }

  setAssuntos(event: any) {
    this.assuntos = event;
  }
}
