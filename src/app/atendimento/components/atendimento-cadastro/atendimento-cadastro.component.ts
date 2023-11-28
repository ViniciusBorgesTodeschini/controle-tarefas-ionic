import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AtendimentoInterface } from '../../types/atendimento.interface';
import { AtendimentoService } from '../../services/atendimento.service';
import { MaskitoOptions } from '@maskito/core';
import { AtendimentoAssuntoInterface } from '../../atendimento-assunto/types/atendimento-assunto.interface';
import { AtendimentoAssuntoService } from '../../atendimento-assunto/services/atendimento-assunto.service';
import { AtendimentoMeioInterface } from '../../atendimento-meio/types/atendimento-meio.interface';
import { AtendimentoMeioService } from '../../atendimento-meio/services/atendimento-meio.service';
import { PessoaInterface } from 'src/app/pessoa/types/pessoa.interface';
import { PessoaService } from 'src/app/pessoa/services/pessoa.service';
import { UsuarioInterface } from 'src/app/usuario/types/usuario.interface';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';

@Component({
  selector: 'app-atendimento-cadastro',
  templateUrl: './atendimento-cadastro.component.html',
  styleUrls: ['./atendimento-cadastro.component.scss'],
})
export class AtendimentoCadastroComponent implements OnInit {
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

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private atendimentoService: AtendimentoService,
    private atendimentoAssuntoService: AtendimentoAssuntoService,
    private atendimentoMeioService: AtendimentoMeioService,
    private pessoaService: PessoaService,
    private usuarioService: UsuarioService,
    private router: Router
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
      this.atendimentoService.getAtendimento(this.atendimentoId).subscribe((atendimento) => {
        this.selectedAssunto = atendimento.assunto;
        this.selectedMeio = atendimento.meio;
        this.selectedSolicitante = atendimento.solicitante;
        this.selectedAtendente = atendimento.atendente;
        this.atendimentoForm = this.createForm(atendimento);
      });
    }
  }

  getAssuntos() {
    this.atendimentoAssuntoService.getAtendimentosAssuntos().subscribe(
      (dados) => {
        this.assuntos = dados;
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

  getMeios() {
    this.atendimentoMeioService.getAtendimentosMeios().subscribe(
      (dados) => {
        this.meios = dados;
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

  getSolicitantes() {
    this.pessoaService.getPessoas().subscribe(
      (dados) => {
        this.solicitantes = dados;
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

  getAtendentes() {
    this.usuarioService.getUsuarios().subscribe(
      (dados) => {
        this.atendentes = dados;
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

  private createForm(atendimento?: AtendimentoInterface) {
    return new FormGroup({
      detalhes: new FormControl(atendimento?.detalhes || '', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500),
      ]),
      assunto: new FormControl(
        atendimento?.assunto || true,
        Validators.required
      ),
      meio: new FormControl(
        atendimento?.meio || null,
        Validators.required
      ),
      inicioAtendimento: new FormControl(
        atendimento?.inicioAtendimento || null,
      ),
      fimAtendimento: new FormControl(
        atendimento?.fimAtendimento || null,
      ),
      solicitante: new FormControl(
        atendimento?.solicitante || null,
        Validators.required
      ),
      atendente: new FormControl(
        atendimento?.atendente || null,
        Validators.required
      )
    });
  }

  salvar() {
    const atendimento: AtendimentoInterface = {
      ...this.atendimentoForm.value,
      id: this.atendimentoId,
    };
    atendimento.assunto = this.assunto;
    this.atendimentoService.salvar(atendimento).subscribe(
      () => this.router.navigate(['atendimento']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar a atendimento ${atendimento.detalhes}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
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
