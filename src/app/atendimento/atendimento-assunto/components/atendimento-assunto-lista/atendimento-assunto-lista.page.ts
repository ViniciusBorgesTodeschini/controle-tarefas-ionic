import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { AtendimentoAssuntoInterface } from '../../types/atendimento-assunto.interface';
import { AtendimentoAssuntoService } from '../../services/atendimento-assunto.service';
import { Page } from 'src/app/common/types/types';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-atendimento-assunto',
  templateUrl: './atendimento-assunto-lista.page.html',
  styleUrls: ['./atendimento-assunto-lista.page.scss']
})
export class AtendimentoAssuntoPage implements OnInit {
  assuntos: AtendimentoAssuntoInterface[] = [];
  page: Page<AtendimentoAssuntoInterface> = {
    list: [],
    page: 1,
    rpp: 10,
    totalCount: 0
  };

  constructor(
    private alertController: AlertController,
    private atendimentoAssuntoService: AtendimentoAssuntoService,
    private alertService: AlertService
  ) { }

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

  ngOnInit() { }

  listar() {
    this.atendimentoAssuntoService.getAtendimentosAssuntos().subscribe(
      (dados) => {
        this.page = dados;
        this.assuntos = dados.list;
      },
      (erro) => {
        console.error(erro);
        this.alertService.error('Erro ao carregar listagem de assuntos');
      }
    );
  }

  changePage() {
    const params = {
      page: this.page.page + 1,
      rpp: 10
    }
    this.atendimentoAssuntoService.getAtendimentosAssuntos(params).subscribe(
      (dados) => {
        this.page = dados;
        this.assuntos.push(...dados.list);
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
          this.alertService.error(`Não foi possível excluir o assunto ${assunto.nome}`);
        }
      );
    }
  }

  setAssuntos(event: any) {
    this.assuntos = event;
  }
}
