import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from '../models';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  directives: [ROUTER_DIRECTIVES, NgForm]
})
export class LoginComponent implements OnInit {

  private user: User;

  constructor() {
  }

  ngOnInit() {
    this.user = new User;
  }

}
