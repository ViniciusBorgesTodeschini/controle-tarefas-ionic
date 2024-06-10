import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PessoaInterface } from '../../types/pessoa.interface';
import { PessoaService } from '../../services/pessoa.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa-lista.page.html',
  styleUrls: ['./pessoa-lista.page.scss']
})
export class PessoaPage implements OnInit {
  pessoas: PessoaInterface[] = [];

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
        this.pessoas = dados;
      },
      (erro) => {
        console.error(erro);
        this.alertService.error('Erro ao carregar listagem de pessoas');
      }
    );
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
