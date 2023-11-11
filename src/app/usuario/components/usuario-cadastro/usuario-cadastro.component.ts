import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsuarioInterface } from '../../types/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss']
})
export class UsuarioCadastroComponent implements OnInit {
  usuarioId: number | null;
  usuarioForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.usuarioId = null;
    this.usuarioForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioId = parseInt(id);
      this.usuarioService.getUsuario(this.usuarioId).subscribe((usuario) => {
        this.usuarioForm = this.createForm(usuario);
      });
    }
  }

  private createForm(usuario?: UsuarioInterface) {
    return new FormGroup({
      nome: new FormControl(usuario?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      pessoa: new FormControl(
        usuario?.pessoa || null
      ),
      dataCadastro: new FormControl(
        usuario?.dataCadastro || new Date().toISOString(),
        Validators.required
      ),
      dataAtualizacao: new FormControl(usuario?.dataAtualizacao || new Date().toISOString()),
      dataUltimoAcesso: new FormControl(usuario?.dataUltimoAcesso || new Date().toISOString()),
      ativo: new FormControl(
        usuario?.ativo || true,
        Validators.required
      ),
      cliente: new FormControl(
        usuario?.ativo || true,
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
      () => this.router.navigate(['usuarios']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar a usuario ${usuario.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.usuarioForm.get('nome');
  }
}
