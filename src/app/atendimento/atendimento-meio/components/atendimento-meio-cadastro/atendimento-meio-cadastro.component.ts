import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentoMeioInterface } from '../../types/atendimento-meio.interface';
import { AtendimentoMeioService } from '../../services/atendimento-meio.service';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-atendimento-meio-cadastro',
  templateUrl: './atendimento-meio-cadastro.component.html',
  styleUrls: ['./atendimento-meio-cadastro.component.scss']
})
export class AtendimentoMeioCadastroComponent implements OnInit, OnDestroy {
  atendimentoMeioId: number | null;
  atendimentoMeioForm: FormGroup;
  private subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private atendimentoMeioService: AtendimentoMeioService,
    private router: Router,
    private alertService: AlertService,
  ) {
    this.atendimentoMeioId = null;
    this.atendimentoMeioForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.atendimentoMeioId = parseInt(id);
      this.subscriptions.add(
        this.atendimentoMeioService.getAtendimentoMeio(this.atendimentoMeioId).subscribe((antendimentoMeio) => {
          this.atendimentoMeioForm = this.createForm(antendimentoMeio);
        }, (error) => {
          this.alertService.error('Não foi possível carregar os dados do meio de atendimento!')
          console.error(error)
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
      () => this.router.navigate(['atendimento-meio']),
      (erro) => {
        console.error(erro);
        this.alertService.error(`Não foi possível salvar o meio de atendimento ${meio.nome}`);
      }
    );
  }

  get nome() {
    return this.atendimentoMeioForm.get('nome');
  }
}
