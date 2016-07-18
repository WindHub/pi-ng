import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NgForm, FormControl, FormGroup, Validators, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { Validation } from '../const';

import { User } from '../models';

@Component({
  selector: 'my-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  directives: [NgForm, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES ],
  pipes: [TranslatePipe]
})
export class RegisterComponent implements OnInit {

  private user: User;
  private form: {};

  constructor() {
  }

  ngOnInit() {
    this.user = new User;
    this.form = new FormGroup({
      'name': new FormControl('', [Validators.pattern(this.getValidator('Username')), Validators.required]),
      'password': new FormControl('', [Validators.pattern(this.getValidator('Password')), Validators.required]),
      'email': new FormControl('', [Validators.pattern(this.getValidator('Email')), Validators.required])
    });
  }

  getValidator(validator: string): string {
    let pattern = Validation.User[validator].toString();
    return pattern.substr(1, pattern.length - 2);
  }
}
