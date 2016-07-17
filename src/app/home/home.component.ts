import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { App } from '../models';
import { LOGIN_SERVICE_PROVIDER, LoginService, AppService } from '../services'

import { AppViewerComponent } from '../utils/components/app-viewer';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  directives: [ROUTER_DIRECTIVES, AppViewerComponent],
  providers: [LOGIN_SERVICE_PROVIDER, AppService]
})
export class HomeComponent implements OnInit {

  private apps: App[];

  constructor(
    private loginService: LoginService,
    private appService: AppService
  ) {
  }

  ngOnInit() {
    this.appService.getApps()
      .subscribe(
        apps => this.apps = apps,
        error => console.error(error)
      );
  }

}
