import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AtendimentoAssuntoInterface } from '../../types/atendimento-assunto.interface';
import { AtendimentoAssuntoService } from '../../services/atendimento-assunto.service';

@Component({
  selector: 'app-atendimento-assunto-cadastro',
  templateUrl: './atendimento-assunto-cadastro.component.html',
  styleUrls: ['./atendimento-assunto-cadastro.component.scss'],
})
export class AtendimentoAssuntoCadastroComponent implements OnInit {
  atendimentoAssuntoId: number | null;
  atendimentoAssuntoForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private atendimentoAssuntoService: AtendimentoAssuntoService,
    private router: Router
  ) {
    this.atendimentoAssuntoId = null;
    this.atendimentoAssuntoForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.atendimentoAssuntoId = parseInt(id);
      this.atendimentoAssuntoService.getAtendimentoAssunto(this.atendimentoAssuntoId).subscribe((antendimentoAssunto) => {
        this.atendimentoAssuntoForm = this.createForm(antendimentoAssunto);
      });
    }
  }

  private createForm(assunto?: AtendimentoAssuntoInterface) {
    return new FormGroup({
      nome: new FormControl(assunto?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ])
    });
  }

  salvar() {
    const assunto: AtendimentoAssuntoInterface = {
      ...this.atendimentoAssuntoForm.value,
      id: this.atendimentoAssuntoId,
    };
    this.atendimentoAssuntoService.salvar(assunto).subscribe(
      () => this.router.navigate(['atendimento-assuntos']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o assunto de atendimento ${assunto.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.atendimentoAssuntoForm.get('nome');
  }
}
