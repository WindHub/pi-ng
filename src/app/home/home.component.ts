import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { LoginService } from '../services'

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  directives: [ROUTER_DIRECTIVES],
  providers: [LoginService]
})
export class HomeComponent {

  constructor(
    private loginService: LoginService
  ) {
  }

}
