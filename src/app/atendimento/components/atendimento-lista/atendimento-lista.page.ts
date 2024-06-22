import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { AtendimentoInterface } from '../../types/atendimento.interface';
import { AtendimentoService } from '../../services/atendimento.service';
import { AtendimentoAssuntoInterface } from '../../atendimento-assunto/types/atendimento-assunto.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { Page } from 'src/app/common/types/types';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento-lista.page.html',
  styleUrls: ['./atendimento-lista.page.scss']
})
export class AtendimentoPage implements OnInit {
  atendimentos: AtendimentoInterface[] = [];
  assunto: AtendimentoAssuntoInterface = {} as AtendimentoAssuntoInterface;
  page: Page<AtendimentoInterface> = {
    list: [],
    page: 1,
    rpp: 10,
    totalCount: 0
  };

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
          console.log(dados);
          this.page = dados;
          this.atendimentos = dados.list;
        },
        (erro) => {
          console.error(erro);
          this.alertService.error('Erro ao carregar listagem de atendimentos');
        }
    );
  }

  changePage() {
    const params = {
      page: this.page.page + 1,
      rpp: 10
    }
    this.atendimentoService.getAtendimentos(params).subscribe(
      (dados) => {
        this.page = dados;
        this.atendimentos.push(...dados.list);
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
