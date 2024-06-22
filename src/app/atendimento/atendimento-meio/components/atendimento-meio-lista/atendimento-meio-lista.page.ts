import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { AtendimentoMeioInterface } from '../../types/atendimento-meio.interface';
import { AtendimentoMeioService } from '../../services/atendimento-meio.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { Page } from 'src/app/common/types/types';

@Component({
  selector: 'app-atendimento-meio',
  templateUrl: './atendimento-meio-lista.page.html',
  styleUrls: ['./atendimento-meio-lista.page.scss']
})
export class AtendimentoMeioPage implements OnInit {
  meios: AtendimentoMeioInterface[] = [];
  page: Page<AtendimentoMeioInterface> = {
    list: [],
    page: 1,
    rpp: 10,
    totalCount: 0
  };

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
        this.page = dados;
        this.meios = dados.list;
      },
      (erro) => {
        console.error(erro);
        this.alertService.error('Erro ao carregar listagem de meio de atendimento');
      }
    );
  }

  changePage() {
    const params = {
      page: this.page.page + 1,
      rpp: 10
    }
    this.atendimentoMeioService.getAtendimentosMeios(params).subscribe(
      (dados) => {
        this.page = dados;
        this.meios.push(...dados.list);
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
