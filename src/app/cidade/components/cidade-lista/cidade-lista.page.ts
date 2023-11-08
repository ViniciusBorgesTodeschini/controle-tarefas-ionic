import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { CidadeInterface } from '../../types/cidade.interface';
import { CidadeService } from '../../services/cidade.service';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade-lista.page.html',
  styleUrls: ['./cidade-lista.page.scss']
})
export class CidadesPage implements OnInit {
  cidades: CidadeInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private cidadeService: CidadeService
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
          this.toastController
            .create({
              message: `Não foi possível excluir o cidade ${cidade.nome}`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
        }
      );
    }
  }
}
