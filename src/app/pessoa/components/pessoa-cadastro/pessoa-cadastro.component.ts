import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PessoaInterface } from '../../types/pessoa.interface';
import { PessoaService } from '../../services/pessoa.service';
import { TipoPessoaEnum } from '../../types/tipo-pessoa.enum';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.scss']
})
export class PessoaCadastroComponent implements OnInit {
  pessoaId: number | null;
  pessoaForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private pessoaService: PessoaService,
    private router: Router
  ) {
    this.pessoaId = null;
    this.pessoaForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.pessoaId = parseInt(id);
      this.pessoaService.getPessoa(this.pessoaId).subscribe((pessoa) => {
        this.pessoaForm = this.createForm(pessoa);
      });
    }
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
        pessoa?.ativo || true,
        Validators.required
      ),
      cliente: new FormControl(
        pessoa?.ativo || true,
        Validators.required
      ),
      departamento: new FormControl(
        pessoa?.departamento || null
      ),
      pessoa: new FormControl(
        pessoa?.pessoa || null
      )
    });
  }

  salvar() {
    const pessoa: PessoaInterface = {
      ...this.pessoaForm.value,
      id: this.pessoaId,
    };
    this.pessoaService.salvar(pessoa).subscribe(
      () => this.router.navigate(['pessoas']),
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
