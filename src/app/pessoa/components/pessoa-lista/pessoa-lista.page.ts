import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { PessoaInterface } from '../../types/pessoa.interface';
import { PessoaService } from '../../services/pessoa.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { Page } from 'src/app/common/types/types';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa-lista.page.html',
  styleUrls: ['./pessoa-lista.page.scss']
})
export class PessoaPage implements OnInit {
  pessoas: PessoaInterface[] = [];
  page: Page<PessoaInterface> = {
    list: [],
    page: 1,
    rpp: 10,
    totalCount: 0
  };

  constructor(
    private alertController: AlertController,
    private pessoaService: PessoaService,
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
    this.pessoaService.getPessoas().subscribe(
      (dados) => {
        this.page = dados
        this.pessoas = dados.list;
      },
      (erro) => {
        console.error(erro);
        this.alertService.error('Erro ao carregar listagem de pessoas');
      }
    );
  }

  changePage() {
    const params = {
      page: this.page.page + 1,
      rpp: 10
    }
    this.pessoaService.getPessoas(params).subscribe(
      (dados) => {
        this.page = dados;
        this.pessoas.push(...dados.list);
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

  confirmarExclusao(pessoa: PessoaInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir a pessoa ${pessoa.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(pessoa),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(pessoa: PessoaInterface) {
    if (pessoa.id) {
      this.pessoaService.excluir(pessoa.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.alertService.error(`Não foi possível excluir a pessoa ${pessoa.nome}`);
        }
      );
    }
  }

  setPessoas(event: any) {
    this.pessoas = event;
  }
}
