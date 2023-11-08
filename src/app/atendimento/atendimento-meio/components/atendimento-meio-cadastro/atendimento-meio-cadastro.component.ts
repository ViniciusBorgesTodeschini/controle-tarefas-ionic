import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AtendimentoMeioInterface } from '../../types/atendimento-meio.interface';
import { AtendimentoMeioService } from '../../services/atendimento-meio.service';

@Component({
  selector: 'app-atendimento-meio-cadastro',
  templateUrl: './atendimento-meio-cadastro.component.html',
  styleUrls: ['./atendimento-meio-cadastro.component.scss']
})
export class AtendimentoMeioCadastroComponent implements OnInit {
  atendimentoMeioId: number | null;
  atendimentoMeioForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private atendimentoMeioService: AtendimentoMeioService,
    private router: Router
  ) {
    this.atendimentoMeioId = null;
    this.atendimentoMeioForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.atendimentoMeioId = parseInt(id);
      this.atendimentoMeioService.getAtendimentoMeio(this.atendimentoMeioId).subscribe((antendimentoMeio) => {
        this.atendimentoMeioForm = this.createForm(antendimentoMeio);
      });
    }
  }

  private createForm(meio?: AtendimentoMeioInterface) {
    return new FormGroup({
      nome: new FormControl(meio?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ])
    });
  }

  salvar() {
    const meio: AtendimentoMeioInterface = {
      ...this.atendimentoMeioForm.value,
      id: this.atendimentoMeioId,
    };
    this.atendimentoMeioService.salvar(meio).subscribe(
      () => this.router.navigate(['atendimento-meios']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o meio de atendimento ${meio.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.atendimentoMeioForm.get('nome');
  }
}
