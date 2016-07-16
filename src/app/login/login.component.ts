import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { LoginService } from '../services'
import { Login } from '../models';

import { LoadIndicatorComponent } from '../utils/components/load-indicator'

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  directives: [ROUTER_DIRECTIVES, NgForm, LoadIndicatorComponent],
  providers: [LoginService],
  pipes: [TranslatePipe]
})
export class LoginComponent implements OnInit, OnDestroy {

  private login: Login;
  private errorCode: number;
  private loginSub: any;
  private isActive: boolean;

  constructor(
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.login = new Login;
    this.errorCode = 0;
    this.isActive = false;
  }

  onSubmit() {
    this.loginSub = this.loginService.login(this.login)
      .subscribe(
        login => {
          this.login = login;
          this.isActive = false;
          this.loginService.checkLoggedIn().subscribe(
            login => {
              this.isActive = false;
            },
            error => {
              this.isActive = false;
              this.errorCode = 401.5;
            }
          );
        },
        error => {
          this.errorCode = error.json().code;
          this.isActive = false;
        }
      );
    this.isActive = true;
    this.errorCode = 0;
  }

  onCancel() {
    this.loginSub.unsubscribe();
    this.isActive = false;
  }

  ngOnDestroy() {
    if (this.loginSub) this.loginSub.unsubscribe();
  }
}
