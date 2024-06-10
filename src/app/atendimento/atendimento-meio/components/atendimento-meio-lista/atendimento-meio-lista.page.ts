import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AtendimentoMeioInterface } from '../../types/atendimento-meio.interface';
import { AtendimentoMeioService } from '../../services/atendimento-meio.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-atendimento-meio',
  templateUrl: './atendimento-meio-lista.page.html',
  styleUrls: ['./atendimento-meio-lista.page.scss']
})
export class AtendimentoMeioPage implements OnInit {
  meios: AtendimentoMeioInterface[] = [];

  constructor(
    private alertController: AlertController,
    private alertService: AlertService,
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
        this.alertService.error('Erro ao carregar listagem de meio de atendimento');
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
          this.alertService.error(`Não foi possível excluir o meio de atendimento ${meio.nome}`);
        }
      );
    }
  }

  setMeios(event: any) {
    this.meios = event;
  }
}
