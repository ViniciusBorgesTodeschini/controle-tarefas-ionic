import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-footer-toolbar',
  templateUrl: './footer-toolbar.html',
  styleUrls: ['./footer-toolbar.scss'],
})
export class FooterToolbar {
  menuItems = [
    {
      title: 'Homepage',
      icon: 'home-outline',
      onclick: () => this.navigate('/home'),
    },
    {
      title: 'Atendimentos',
      icon: 'clipboard-outline',
      onclick: () => this.navigate('/atendimento'),
    },
    {
      title: 'Usuários',
      icon: 'person-outline',
      onclick: () => this.navigate('/usuario'),
    },
    { title: '', icon: 'menu-outline', onclick: () => this.openSideMenu() },
  ];

  constructor(private router: Router, private menuCtrl: MenuController) {}

  navigate(path: string) {
    console.log('oi');
    this.router.navigate([path]);
  }

  openSideMenu() {
    this.menuCtrl.open('side-menu');
  }

  sideMenuNavigate(path: string) {
    this.menuCtrl.close('side-menu').then(() => {
        this.navigate(path);
    });
  }
}
