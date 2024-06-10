import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AtendimentoInterface } from '../../types/atendimento.interface';
import { AtendimentoService } from '../../services/atendimento.service';
import { AtendimentoAssuntoInterface } from '../../atendimento-assunto/types/atendimento-assunto.interface';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento-lista.page.html',
  styleUrls: ['./atendimento-lista.page.scss']
})
export class AtendimentoPage implements OnInit {
  atendimentos: AtendimentoInterface[] = [];
  assunto: AtendimentoAssuntoInterface = {} as AtendimentoAssuntoInterface;

  constructor(
    private alertController: AlertController,
    private atendimentoService: AtendimentoService,
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
    this.atendimentoService.getAtendimentos().subscribe(
        (dados) => {
          this.atendimentos = dados;
        },
        (erro) => {
          console.error(erro);
          this.alertService.error('Erro ao carregar listagem de atendimentos');
        }
    );
  }

  confirmarExclusao(atendimento: AtendimentoInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir a atendimento ${atendimento.assunto.nome}?`,
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
          this.alertService.error(`Não foi possível excluir a atendimento ${atendimento.assunto}`);
        }
      );
    }
  }

  setAtendimentos(event: any) {
    this.atendimentos = event;
  }
}
