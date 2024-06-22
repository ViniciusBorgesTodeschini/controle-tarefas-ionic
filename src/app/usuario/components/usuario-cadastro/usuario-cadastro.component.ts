import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioInterface } from '../../types/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { PessoaInterface } from 'src/app/pessoa/types/pessoa.interface';
import { PessoaService } from 'src/app/pessoa/services/pessoa.service';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss']
})
export class UsuarioCadastroComponent implements OnInit, OnDestroy {
  usuarioId: number | null;
  usuarioForm: FormGroup;
  pessoas: Array<PessoaInterface> = [];
  selectedPessoa: PessoaInterface = {} as PessoaInterface;

  private subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private pessoaService: PessoaService,
    private alertService: AlertService,
  ) {
    this.usuarioId = null;
    this.usuarioForm = this.createForm();
    this.getPessoas();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioId = parseInt(id);
      this.subscriptions.add(
        this.usuarioService.getUsuario(this.usuarioId).subscribe((usuario) => {
          this.selectedPessoa = usuario.pessoa;
          this.usuarioForm = this.createForm(usuario);
          console.log(this.usuarioForm)
        }, (error) => {
          this.alertService.error('Não foi possível carregar os dados do usuário!')
          console.error(error)
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getPessoas(): void {
    this.pessoaService.getPessoas().subscribe(
      (dados) => {
        this.pessoas = Object.values(dados.list);
      },
      (erro) => {
        console.error(erro);
        this.alertService.error('Não foi possível carregar as pessoas. Tente novamente mais tarde')
      }
    );
  }

  private createForm(usuario?: UsuarioInterface) {
    return new FormGroup({
      nome: new FormControl(usuario?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      email: new FormControl(usuario?.email || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      pessoaId: new FormControl(
        usuario?.pessoa
      ),
      dataCadastro: new FormControl(
        usuario?.dataCadastro || new Date().toISOString(),
        Validators.required
      ),
      dataAtualizacao: new FormControl(usuario?.dataAtualizacao || new Date().toISOString()),
      dataUltimoAcesso: new FormControl(usuario?.dataUltimoAcesso || new Date().toISOString()),
      ativo: new FormControl(
        usuario?.ativo,
        Validators.required
      ),
      administrador: new FormControl(
        usuario?.administrador || null
      )
    });
  }

  salvar() {
    const usuario: UsuarioInterface = {
      ...this.usuarioForm.value,
      id: this.usuarioId,
    };
    this.usuarioService.salvar(usuario).subscribe(
      () => this.router.navigate(['usuario']),
      (erro) => {
        console.error(erro);
        this.alertService.error(`Não foi possível salvar o usuário ${usuario.nome}`);
      }
    );
  }

  get nome() {
    return this.usuarioForm.get('nome');
  }

  get email() {
    return this.usuarioForm.get('email');
  }
}
