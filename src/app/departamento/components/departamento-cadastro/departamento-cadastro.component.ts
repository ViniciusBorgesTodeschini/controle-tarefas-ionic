import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DepartamentoInterface } from '../../types/departamento.interface';
import { DepartamentoService } from '../../services/departamento.service';

@Component({
  selector: 'app-departamento-cadastro',
  templateUrl: './departamento-cadastro.component.html',
  styleUrls: ['./departamento-cadastro.component.scss']
})
export class DepartamentoCadastroComponent implements OnInit {
  departamentoId: number | null;
  departamentoForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private departamentoService: DepartamentoService,
    private router: Router
  ) {
    this.departamentoId = null;
    this.departamentoForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.departamentoId = parseInt(id);
      this.departamentoService.getDepartamento(this.departamentoId).subscribe((departamento) => {
        this.departamentoForm = this.createForm(departamento);
      });
    }
  }

  private createForm(departamento?: DepartamentoInterface) {
    return new FormGroup({
      nome: new FormControl(departamento?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ])
    });
  }

  salvar() {
    const departamento: DepartamentoInterface = {
      ...this.departamentoForm.value,
      id: this.departamentoId,
    };
    this.departamentoService.salvar(departamento).subscribe(
      () => this.router.navigate(['departamentos']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o departamento ${departamento.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.departamentoForm.get('nome');
  }
}
