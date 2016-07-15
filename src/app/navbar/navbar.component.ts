import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { ApiService } from '../utils';

@Component({
  selector: 'my-navbar',
  templateUrl: './navbar.component.html',
  providers: [ApiService],
  pipes: [TranslatePipe],
  directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES]
})
export class NavbarComponent {

  navs = {
    default: {
      main: [
        { name: 'app', link: 'app' },
      ],
      user: [
        { name: 'login', link: 'user/login' },
        { name: 'register', link: 'user/signup' }
      ]
    },
    login: {
      main: [
        //{ name: 'home', link: 'home'}
      ],
      user: [
        { name: 'profile', link: 'profile' },
        { name: 'inbox', link: 'inbox' },
        { name: 'settings', link: 'settings' },
        { name: 'logout', link: 'logout' }
      ]
    }
  };

  constructor(private api: ApiService) {
  }

}
