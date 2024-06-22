import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { DepartamentoInterface } from '../../types/departamento.interface';
import { DepartamentoService } from '../../services/departamento.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { Page } from 'src/app/common/types/types';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento-lista.page.html',
  styleUrls: ['./departamento-lista.page.scss']
})
export class DepartamentoPage implements OnInit {
  departamentos: DepartamentoInterface[] = [];
  page: Page<DepartamentoInterface> = {
    list: [],
    page: 1,
    rpp: 10,
    totalCount: 0
  };

  constructor(
    private alertController: AlertController,
    private departamentoService: DepartamentoService,
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
    this.departamentoService.getDepartamentos().subscribe(
      (dados) => {
        this.page = dados;
        this.departamentos = dados.list;
      },
      (erro) => {
        console.error(erro);
        this.alertService.error('Erro ao carregar listagem de departamentos');
      }
    );
  }

  changePage() {
    const params = {
      page: this.page.page + 1,
      rpp: 10
    }
    this.departamentoService.getDepartamentos(params).subscribe(
      (dados) => {
        this.page = dados;
        this.departamentos.push(...dados.list);
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

  confirmarExclusao(departamento: DepartamentoInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o departamento ${departamento.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(departamento),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(departamento: DepartamentoInterface) {
    if (departamento.id) {
      this.departamentoService.excluir(departamento.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.alertService.error(`Não foi possível excluir o assunto ${departamento.nome}`);
        }
      );
    }
  }

  setDepartamentos(event: any) {
    this.departamentos = event;
  }
}
