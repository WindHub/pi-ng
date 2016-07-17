import { Component, Input } from '@angular/core';

import { App } from '../../../models';
import { LOGIN_SERVICE_PROVIDER, LoginService, AppService } from '../../../services'

import { LoadIndicatorComponent } from '../load-indicator';

@Component({
  selector: 'my-app-viewer',
  templateUrl: './app-viewer.component.html',
  directives: [LoadIndicatorComponent],
  providers: [LOGIN_SERVICE_PROVIDER, AppService],
  styleUrls: ['./app-viewer.component.scss']
})
export class AppViewerComponent {
  @Input() app: App;

  private isLoading: boolean;
  private isError: boolean;

  constructor(
    private loginService: LoginService,
    private appService: AppService
  ) {
    this.isLoading = this.isError = false;
  }

  private onNavigate() {
    if (this.isLoading || this.loginService.isLoggedIn) event.preventDefault();
    if(this.isError) {
      window.location.href = this.app.entrance_url;
    } else if (!this.isLoading) {
      if (this.loginService.isLoggedIn) {
        event.preventDefault();
        this.isLoading = true;
        this.appService.getToken(this.app).subscribe(
          appToken => {
            this.appService.saveToken(appToken).subscribe(
              result => { window.location.href = appToken.app.entrance_url; },
              error => { this.isLoading = false;  this.isError = true; }
            );
          },
          error => { this.isLoading = false; this.isError = true; }
        );
      }
    }
  }
}
