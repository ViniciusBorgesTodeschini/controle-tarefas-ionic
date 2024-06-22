import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentoInterface } from '../../types/atendimento.interface';
import { AtendimentoService } from '../../services/atendimento.service';
import { AtendimentoAssuntoInterface } from '../../atendimento-assunto/types/atendimento-assunto.interface';
import { AtendimentoAssuntoService } from '../../atendimento-assunto/services/atendimento-assunto.service';
import { AtendimentoMeioInterface } from '../../atendimento-meio/types/atendimento-meio.interface';
import { AtendimentoMeioService } from '../../atendimento-meio/services/atendimento-meio.service';
import { PessoaInterface } from 'src/app/pessoa/types/pessoa.interface';
import { PessoaService } from 'src/app/pessoa/services/pessoa.service';
import { UsuarioInterface } from 'src/app/usuario/types/usuario.interface';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-atendimento-cadastro',
  templateUrl: './atendimento-cadastro.component.html',
  styleUrls: ['./atendimento-cadastro.component.scss'],
})
export class AtendimentoCadastroComponent implements OnInit, OnDestroy {
  atendimentoId: number | null;
  atendimentoForm: FormGroup;
  assuntos: Array<AtendimentoAssuntoInterface> = [];
  selectedAssunto: AtendimentoAssuntoInterface = {} as AtendimentoAssuntoInterface;
  meios: Array<AtendimentoMeioInterface> = [];
  selectedMeio: AtendimentoMeioInterface = {} as AtendimentoMeioInterface;
  solicitantes: Array<PessoaInterface> = [];
  selectedSolicitante: PessoaInterface | null = {} as PessoaInterface;
  atendentes: Array<UsuarioInterface> = [];
  selectedAtendente: UsuarioInterface | null = {} as UsuarioInterface;
  assunto: AtendimentoAssuntoInterface = {} as AtendimentoAssuntoInterface;

  private subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private atendimentoService: AtendimentoService,
    private atendimentoAssuntoService: AtendimentoAssuntoService,
    private atendimentoMeioService: AtendimentoMeioService,
    private pessoaService: PessoaService,
    private usuarioService: UsuarioService,
    private router: Router,
    private alertService: AlertService,
  ) {
    this.atendimentoId = null;
    this.atendimentoForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getAssuntos();
    this.getMeios();
    this.getSolicitantes();
    this.getAtendentes();
    if (id) {
      this.atendimentoId = parseInt(id);
      this.subscriptions.add(
        this.atendimentoService.getAtendimento(this.atendimentoId).subscribe((atendimento) => {
          this.selectedAssunto = atendimento.assunto;
          this.selectedMeio = atendimento.meio;
          this.selectedSolicitante = atendimento.solicitante;
          this.selectedAtendente = atendimento.usuario;
          this.atendimentoForm = this.createForm(atendimento);
        }, (error) => {
          this.alertService.error('Não foi possível carregar os dados do atendimento!')
          console.error(error)
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getAssuntos() {
    this.atendimentoAssuntoService.getAtendimentosAssuntos().subscribe(
      (dados) => {
        this.assuntos = dados.list;
      },
      (erro) => {
        console.error(erro);
        this.alertService.error('Não foi possível carregar os assuntos de atendimento. Tente novamente mais tarde')
      }
    );
  }

  getMeios() {
    this.atendimentoMeioService.getAtendimentosMeios().subscribe(
      (dados) => {
        this.meios = dados.list;
      },
      (erro) => {
        console.error(erro);
        this.alertService.error('Não foi possível carregar os meios de atendimento. Tente novamente mais tarde')
      }
    );
  }

  getSolicitantes() {
    this.pessoaService.getPessoas().subscribe(
      (dados) => {
        this.solicitantes = dados.list;
      },
      (erro) => {
        console.error(erro);
        this.alertService.error('Não foi possível carregar os solicitantes. Tente novamente mais tarde')
      }
    );
  }

  getAtendentes() {
    this.usuarioService.getUsuarios().subscribe(
      (dados) => {
        this.atendentes = dados.list;
      },
      (erro) => {
        console.error(erro);
        this.alertService.error('Não foi possível carregar os atendentes. Tente novamente mais tarde')
      }
    );
  }

  private dataAtualValidator: ValidatorFn = (control: AbstractControl<any, any>): ValidationErrors | null => {
    const dataAtual = new Date();
    if (control.value && control.value > dataAtual) {
      return { dataInvalida: true }
    }
    return null;
  }

  private createForm(atendimento?: AtendimentoInterface) {
    return new FormGroup({
      detalhes: new FormControl(atendimento?.detalhes || '', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500),
      ]),
      assuntoId: new FormControl(
        atendimento?.assunto?.id || atendimento?.assunto || null,[
          Validators.required
        ]
      ),
      meioId: new FormControl(
        atendimento?.meio?.id || atendimento?.meio || null,
        Validators.required
      ),
      inicioAtendimento: new FormControl(
        atendimento?.inicioAtendimento || null,
        this.dataAtualValidator
      ),
      fimAtendimento: new FormControl(
        atendimento?.fimAtendimento || null,
        this.dataAtualValidator
      ),
      solicitanteId: new FormControl(
        atendimento?.solicitante?.id ||atendimento?.solicitante || null,
        Validators.required
      ),
      usuarioId: new FormControl(
        atendimento?.usuario.id || atendimento?.usuario || null,
        Validators.required
      )
    });
  }

  salvar() {
    const atendimento: AtendimentoInterface = {
      ...this.atendimentoForm.value,
      id: this.atendimentoId,
    };

    this.atendimentoService.salvar(atendimento).subscribe(
      () => this.router.navigate(['atendimento']),
      (erro) => {
        console.error(erro);
        this.alertService.error(`Não foi possível salvar o atendimento`);
      }
    );
  }

  get detalhes() {
    return this.atendimentoForm.get('detalhes');
  }

  selectChange(event: any) {
    this.getAssunto(event.detail.value)
  }

  getAssunto(id: number) {
    this.atendimentoAssuntoService.getAtendimentoAssunto(id).subscribe(
      (dados) => {
        this.assunto = dados;
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

}
