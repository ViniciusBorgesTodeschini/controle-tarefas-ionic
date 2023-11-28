import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

register()
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  sideMenuItems = [
    {
      title: 'Assuntos de atendimento',
      icon: 'document-text-outline',
      onclick: () => this.sideMenuNavigate('/atendimento-assunto'),
    },
    {
      title: 'Meios de atendimento',
      icon: 'desktop-outline',
      onclick: () => this.sideMenuNavigate('/atendimento-meio'),
    },
    {
      title: 'Departamentos',
      icon: 'business-outline',
      onclick: () => this.sideMenuNavigate('/departamento'),
    },
    {
      title: 'Cidades',
      icon: 'business-outline',
      onclick: () => this.sideMenuNavigate('/cidade'),
    },    
    {
      title: 'Pessoas',
      icon: 'person-outline',
      onclick: () => this.sideMenuNavigate('/pessoa'),
    }
  ];

  constructor(private router: Router, private menuCtrl: MenuController) {}

  sideMenuNavigate(path: string) {
    this.menuCtrl.close('side-menu').then(() => {
        this.router.navigate([path]);
    });
  }
}
