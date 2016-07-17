import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { LOGIN_SERVICE_PROVIDER, LoginService } from '../services'
import { Login } from '../models';

import { LoadIndicatorComponent } from '../utils/components/load-indicator'

@Component({
  selector: 'my-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./login.component.scss'],
  directives: [ROUTER_DIRECTIVES, NgForm, LoadIndicatorComponent],
  providers: [LOGIN_SERVICE_PROVIDER],
  pipes: [TranslatePipe]
})
export class LogoutComponent implements OnInit {

  private errorCode: number;
  private isActive: boolean;

  constructor(
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.isActive = true;
    this.loginService.logout()
      .subscribe(
        logout => {
          this.isActive = false;
          this.loginService.checkLoggedIn().subscribe(
            login => this.isActive = false,
            error => this.isActive = false
          );
        },
        error => {
          this.errorCode = error.json().code;
          this.isActive = false;
        }
      );
  }
}
