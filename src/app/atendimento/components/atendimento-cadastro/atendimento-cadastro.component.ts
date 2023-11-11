import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AtendimentoInterface } from '../../types/atendimento.interface';
import { AtendimentoService } from '../../services/atendimento.service';

@Component({
  selector: 'app-atendimento-cadastro',
  templateUrl: './atendimento-cadastro.component.html',
  styleUrls: ['./atendimento-cadastro.component.scss']
})
export class AtendimentoCadastroComponent implements OnInit {
  atendimentoId: number | null;
  atendimentoForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private atendimentoService: AtendimentoService,
    private router: Router
  ) {
    this.atendimentoId = null;
    this.atendimentoForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.atendimentoId = parseInt(id);
      this.atendimentoService.getAtendimento(this.atendimentoId).subscribe((atendimento) => {
        this.atendimentoForm = this.createForm(atendimento);
      });
    }
  }

  private createForm(atendimento?: AtendimentoInterface) {
    return new FormGroup({
      detalhes: new FormControl(atendimento?.detalhes || '', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500),
      ]),
      dataCadastro: new FormControl(
        atendimento?.inicioAtendimento || new Date().toISOString(),
        Validators.required
      ),
      dataAtualizacao: new FormControl(
        atendimento?.fimAtendimento || new Date().toISOString(),
        Validators.required
      ),
      assunto: new FormControl(
        atendimento?.assunto || true,
        Validators.required
      ),
      meio: new FormControl(
        atendimento?.meio || null,
        Validators.required
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
    this.atendimentoService.salvar(atendimento).subscribe(
      () => this.router.navigate(['atendimentos']),
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
}
