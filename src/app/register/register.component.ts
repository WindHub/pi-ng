import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from '../models';

@Component({
  selector: 'my-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  directives: [NgForm, ROUTER_DIRECTIVES]
})
export class RegisterComponent implements OnInit {

  private user: User;

  constructor() {
  }

  ngOnInit() {
    this.user = new User;
  }

}
