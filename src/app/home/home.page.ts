import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AtendimentoService } from '../atendimento/services/atendimento.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  qtdAtendimentos: number = 0;
  constructor(private router: Router, private atendimentosService: AtendimentoService) {}

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ngOnInit() {}

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
