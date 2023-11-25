import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { DepartamentoInterface } from '../../types/departamento.interface';
import { DepartamentoService } from '../../services/departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento-lista.page.html',
  styleUrls: ['./departamento-lista.page.scss']
})
export class DepartamentoPage implements OnInit {
  departamentos: DepartamentoInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private departamentoService: DepartamentoService
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
        this.departamentos = dados;
      },
      (erro) => {
        console.error(erro);
      }
    );
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
          this.toastController
            .create({
              message: `Não foi possível excluir o departamento ${departamento.nome}`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
        }
      );
    }
  }

  setDepartamentos(event: any) {
    this.departamentos = event;
  }
}
