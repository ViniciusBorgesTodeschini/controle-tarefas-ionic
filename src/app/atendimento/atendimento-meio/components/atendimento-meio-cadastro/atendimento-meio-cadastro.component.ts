import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutorInterface } from '../../types/atendimento-meio.interface';
import { AutorService } from '../../services/autor.service';
import { GeneroEnum } from '../../types/genero.enum';

@Component({
  selector: 'app-autores-cadastro',
  templateUrl: './autores-cadastro.component.html',
  styleUrls: ['./autores-cadastro.component.scss'],
})
export class AutoresCadastroComponent implements OnInit {
  autorId: number | null;
  autoresForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private autorService: AutorService,
    private router: Router
  ) {
    this.autorId = null;
    this.autoresForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.autorId = parseInt(id);
      this.autorService.getAutor(this.autorId).subscribe((autor) => {
        this.autoresForm = this.createForm(autor);
      });
    }
  }

  private createForm(autor?: AutorInterface) {
    return new FormGroup({
      nome: new FormControl(autor?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      dataNascimento: new FormControl(autor?.dataNascimento || new Date().toISOString()),
      genero: new FormControl(
        autor?.genero || GeneroEnum.FEMININO,
        Validators.required
      ),
    });
  }

  salvar() {
    const autor: AutorInterface = {
      ...this.autoresForm.value,
      id: this.autorId,
    };
    this.autorService.salvar(autor).subscribe(
      () => this.router.navigate(['autores']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o autor ${autor.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.autoresForm.get('nome');
  }
}
