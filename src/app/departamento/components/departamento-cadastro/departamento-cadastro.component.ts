import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartamentoInterface } from '../../types/departamento.interface';
import { DepartamentoService } from '../../services/departamento.service';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-departamento-cadastro',
  templateUrl: './departamento-cadastro.component.html',
  styleUrls: ['./departamento-cadastro.component.scss']
})
export class DepartamentoCadastroComponent implements OnInit, OnDestroy {
  departamentoId: number | null;
  departamentoForm: FormGroup;
  private subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private departamentoService: DepartamentoService,
    private router: Router,
    private alertService: AlertService,
  ) {
    this.departamentoId = null;
    this.departamentoForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.departamentoId = parseInt(id);
      this.subscriptions.add(
        this.departamentoService.getDepartamento(this.departamentoId).subscribe((departamento) => {
          this.departamentoForm = this.createForm(departamento);
        }, (error) => {
          this.alertService.error('Não foi possível carregar os dados do departamento!')
          console.error(error)
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
      () => this.router.navigate(['departamento']),
      (erro) => {
        console.error(erro);
        this.alertService.error(`Não foi possível salvar o departamento ${departamento.nome}`);
      }
    );
  }

  get nome() {
    return this.departamentoForm.get('nome');
  }
}
