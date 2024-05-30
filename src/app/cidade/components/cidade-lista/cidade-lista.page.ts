import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CidadeInterface } from '../../types/cidade.interface';
import { CidadeService } from '../../services/cidade.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade-lista.page.html',
  styleUrls: ['./cidade-lista.page.scss']
})
export class CidadePage implements OnInit {
  cidades: CidadeInterface[] = [];

  constructor(
    private alertController: AlertController,
    private cidadeService: CidadeService,
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
    this.cidadeService.getCidades().subscribe(
      (dados) => {
        this.cidades = dados;
      },
      (erro) => {
        console.error(erro);
        this.alertService.error('Erro ao carregar listagem de cidades');
      }
    );
  }

  confirmarExclusao(cidade: CidadeInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o cidade ${cidade.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(cidade),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(cidade: CidadeInterface) {
    if (cidade.id) {
      this.cidadeService.excluir(cidade.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.alertService.error(`Não foi possível excluir a cidade ${cidade.nome}`);
        }
      );
    }
  }

  setCidades(event: any) {
    this.cidades = event;
  }
}
