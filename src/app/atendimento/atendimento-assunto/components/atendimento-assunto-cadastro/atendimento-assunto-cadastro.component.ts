import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentoAssuntoInterface } from '../../types/atendimento-assunto.interface';
import { AtendimentoAssuntoService } from '../../services/atendimento-assunto.service';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-atendimento-assunto-cadastro',
  templateUrl: './atendimento-assunto-cadastro.component.html',
  styleUrls: ['./atendimento-assunto-cadastro.component.scss']
})

export class AtendimentoAssuntoCadastroComponent implements OnInit, OnDestroy {
  atendimentoAssuntoId: number | null;
  atendimentoAssuntoForm: FormGroup;
  private subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private atendimentoAssuntoService: AtendimentoAssuntoService,
    private router: Router,
    private alertService: AlertService,
  ) {
    this.atendimentoAssuntoId = null;
    this.atendimentoAssuntoForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.atendimentoAssuntoId = parseInt(id);
      this.subscriptions.add(
        this.atendimentoAssuntoService.getAtendimentoAssunto(this.atendimentoAssuntoId).subscribe((antendimentoAssunto) => {
          this.atendimentoAssuntoForm = this.createForm(antendimentoAssunto);
        }, (error) => {
          this.alertService.error('Não foi possível carregar os dados do assunto!')
          console.error(error)
        })
      )
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  salvar() {
    const assunto: AtendimentoAssuntoInterface = {
      ...this.atendimentoAssuntoForm.value,
      id: this.atendimentoAssuntoId,
    };
    this.atendimentoAssuntoService.salvar(assunto).subscribe(
      () => this.router.navigate(['atendimento-assunto']),
      (erro) => {
        console.error(erro);
        this.alertService.error(`Não foi possível salvar o assunto de atendimento ${assunto.nome}`);
      }
    );
  }

  get nome() {
    return this.atendimentoAssuntoForm.get('nome');
  }
}
