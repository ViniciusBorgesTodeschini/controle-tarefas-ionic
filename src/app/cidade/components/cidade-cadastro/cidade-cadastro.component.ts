import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CidadeInterface } from '../../types/cidade.interface';
import { CidadeService } from '../../services/cidade.service';
import { EstadoEnum } from '../../types/estado.enum';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-cidades-cadastro',
  templateUrl: './cidade-cadastro.component.html',
  styleUrls: ['./cidade-cadastro.component.scss']
})
export class CidadeCadastroComponent implements OnInit, OnDestroy {
  cidadeId: number | null;
  cidadesForm: FormGroup;
  estados: any;
  private subscriptions = new Subscription();

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private cidadeService: CidadeService,
    private router: Router,
    private alertService: AlertService,
  ) {
    this.cidadeId = null;
    this.cidadesForm = this.createForm();
    this.estados = Object.values(EstadoEnum);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.cidadeId = parseInt(id);
      this.subscriptions.add(
        this.cidadeService.getCidade(this.cidadeId).subscribe((cidade) => {
          this.cidadesForm = this.createForm(cidade);
        }, (error) => {
          this.alertService.error('Não foi possível carregar os dados da cidade!')
          console.error(error)
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private createForm(cidade?: CidadeInterface) {
    return new FormGroup({
      nome: new FormControl(cidade?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      estado: new FormControl(
        cidade?.estado || EstadoEnum.AC,
        Validators.required
      )
    });
  }

  salvar() {
    const cidade: CidadeInterface = {
      ...this.cidadesForm.value,
      id: this.cidadeId,
    };
    this.cidadeService.salvar(cidade).subscribe(
      () => this.router.navigate(['cidade']),
      (erro) => {
        console.error(erro);
        this.alertService.error(`Não foi possível salvar a cidade ${cidade.nome}`);
      }
    );
  }

  get nome() {
    return this.cidadesForm.get('nome');
  }
}
