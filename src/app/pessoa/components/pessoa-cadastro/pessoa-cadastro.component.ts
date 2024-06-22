import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaInterface } from '../../types/pessoa.interface';
import { PessoaService } from '../../services/pessoa.service';
import { TipoPessoaEnum } from '../../types/tipo-pessoa.enum';
import { CidadeInterface } from 'src/app/cidade/types/cidade.interface';
import { CidadeService } from 'src/app/cidade/services/cidade.service';
import { DepartamentoInterface } from 'src/app/departamento/types/departamento.interface';
import { DepartamentoService } from 'src/app/departamento/services/departamento.service';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { Page } from 'src/app/common/types/types';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.scss']
})
export class PessoaCadastroComponent implements OnInit, OnDestroy {
  pessoaId: number | null;
  pessoaForm: FormGroup;
  tiposPessoa: Array<any>;
  cidades: Array<CidadeInterface> = [];
  departamentos: Array<DepartamentoInterface> = [];
  pessoas: Array<PessoaInterface> = [];
  selectedPessoa: PessoaInterface | null = {} as PessoaInterface;
  selectedDepartamento: DepartamentoInterface | null = {} as DepartamentoInterface;
  selectedCidade: CidadeInterface = {} as CidadeInterface;


  private subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private pessoaService: PessoaService,
    private router: Router,
    private cidadeService: CidadeService,
    private departamentoService: DepartamentoService,
    private alertService: AlertService,
  ) {
    this.pessoaId = null;
    this.pessoaForm = this.createForm();
    this.tiposPessoa = Object.values(TipoPessoaEnum);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCidades();
    this.getDepartamentos();
    this.getPessoas();
    if (id) {
      this.pessoaId = parseInt(id);
      this.subscriptions.add(
        this.pessoaService.getPessoa(this.pessoaId).subscribe((pessoa) => {
          this.selectedCidade = pessoa.cidade;
          this.selectedDepartamento = pessoa?.departamento;
          this.selectedPessoa = pessoa.pessoa;
          this.pessoaForm = this.createForm(pessoa);
        }, (error) => {
          this.alertService.error('Não foi possível carregar os dados da pessoa!')
          console.error(error)
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getCidades() {
    this.cidadeService.getCidades().subscribe(
      (dados) => {
        this.cidades = dados.list;
      },
      (erro) => {
        console.error(erro);
        this.alertService.error('Não foi possível carregar as cidades. Tente novamente mais tarde')
      }
    );
  }

  getDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe(
      (dados) => {
        this.departamentos = dados.list;
      },
      (erro) => {
        this.alertService.error('Não foi possível carregar os departamentos. Tente novamente mais tarde')
        console.error(erro);
      }
    );
  }

  getPessoas() {
    this.pessoaService.getPessoas().subscribe(
      (dados) => {
        this.pessoas = dados.list;
      },
      (erro) => {
        console.error(erro);
        this.alertService.error('Não foi possível carregar as pessoas. Tente novamente mais tarde')
      }
    );
  }

  private createForm(pessoa?: PessoaInterface) {
    return new FormGroup({
      nome: new FormControl(pessoa?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      tipo: new FormControl(
        pessoa?.tipo || TipoPessoaEnum.PF,
        Validators.required
      ),
      documento: new FormControl(pessoa?.documento || '', [
        Validators.required
      ]),
      endereco: new FormControl(pessoa?.endereco || '', [
        Validators.minLength(0),
        Validators.maxLength(100),
      ]),
      telefone: new FormControl(pessoa?.telefone || '', [
        Validators.minLength(0)
      ]),
      ativo: new FormControl(
        pessoa?.ativo || false
      ),
      cliente: new FormControl(
        pessoa?.cliente || false
      ),
      cidadeId: new FormControl(
        pessoa?.cidade || null
      ),
      departamentoId: new FormControl(
        pessoa?.departamento || null
      ),
      pessoaId: new FormControl(
        pessoa?.pessoa || null
      )
    });
  }

  salvar() {
    const pessoa: PessoaInterface = {
      ...this.pessoaForm.value,
      id: this.pessoaId,
    };
    console.log(pessoa);
    this.pessoaService.salvar(pessoa).subscribe(
      () => this.router.navigate(['pessoa']),
      (erro) => {
        console.error(erro);
        this.alertService.error(`Não foi possível salvar a pessoa ${pessoa.nome}`);
      }
    );
  }

  get nome() {
    return this.pessoaForm.get('nome');
  }
}
