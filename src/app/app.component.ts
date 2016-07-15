import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';
import { ApiService } from './utils';

import { NavbarComponent } from './navbar';

import '../style/app.scss';

@Component({
  selector: 'my-app',
  providers: [ApiService],
  pipes: [TranslatePipe],
  directives: [ROUTER_DIRECTIVES, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url = 'https://github.com/WindHub/pi-ng';

  constructor(
    private api: ApiService,
    private translate: TranslateService
  ) {
    let userLang = navigator.language.split('-')[0];
    userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';
    translate.setDefaultLang('en');
    if (localStorage.getItem('lang')) {
      translate.use(localStorage.getItem('lang'));
    } else {
      translate.use(userLang);
    }
  }
}
