import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PessoaInterface } from '../../types/pessoa.interface';
import { PessoaService } from '../../services/pessoa.service';
import { TipoPessoaEnum } from '../../types/tipo-pessoa.enum';
import { CidadeInterface } from 'src/app/cidade/types/cidade.interface';
import { CidadeService } from 'src/app/cidade/services/cidade.service';
import { DepartamentoInterface } from 'src/app/departamento/types/departamento.interface';
import { DepartamentoService } from 'src/app/departamento/services/departamento.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.scss']
})
export class PessoaCadastroComponent implements OnInit {
  pessoaId: number | null;
  pessoaForm: FormGroup;
  tiposPessoa: Array<any>;
  cidades: Array<CidadeInterface> = [];
  departamentos: Array<DepartamentoInterface> = [];
  pessoas: Array<PessoaInterface> = [];
  selectedPessoa: PessoaInterface | null = {} as PessoaInterface;
  selectedDepartamento: DepartamentoInterface | null = {} as DepartamentoInterface;
  selectedCidade: CidadeInterface = {} as CidadeInterface;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private pessoaService: PessoaService,
    private router: Router,
    private cidadeService: CidadeService,
    private departamentoService: DepartamentoService
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
      this.pessoaService.getPessoa(this.pessoaId).subscribe((pessoa) => {
        this.selectedCidade = pessoa.cidade;
        this.selectedDepartamento = pessoa?.departamento;
        this.selectedPessoa = pessoa.pessoa;
        this.pessoaForm = this.createForm(pessoa);
      });
    }
  }

  getCidades() {
    this.cidadeService.getCidades().subscribe(
      (dados) => {
        this.cidades = dados;
      },
      (erro) => {
        console.error(erro);
      }
    );
  }
  
  getDepartamentos() {
    this.departamentoService.getDepartamentos().subscribe(
      (dados) => {
        this.departamentos = dados;
      },
      (erro) => {
        console.error(erro);
      }
    );
  }

  getPessoas() {
    this.pessoaService.getPessoas().subscribe(
      (dados) => {
        this.pessoas = dados;
      },
      (erro) => {
        console.error(erro);
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
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(14),
      ]),
      endereco: new FormControl(pessoa?.endereco || '', [
        Validators.minLength(0),
        Validators.maxLength(100),
      ]),
      telefone: new FormControl(pessoa?.telefone || '', [
        Validators.minLength(0),
        Validators.maxLength(11),
      ]),
      ativo: new FormControl(
        pessoa?.ativo,
        Validators.required
      ),
      cliente: new FormControl(
        pessoa?.cliente ,
        Validators.required
      ),
      cidade: new FormControl(
        pessoa?.cidade,
        Validators.required
      ),
      departamento: new FormControl(
        pessoa?.departamento 
      ),
      pessoa: new FormControl(
        pessoa?.pessoa 
      )
    });
  }

  salvar() {
    const pessoa: PessoaInterface = {
      ...this.pessoaForm.value,
      id: this.pessoaId,
    };
    this.pessoaService.salvar(pessoa).subscribe(
      () => this.router.navigate(['pessoa']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar a pessoa ${pessoa.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.pessoaForm.get('nome');
  }
}
