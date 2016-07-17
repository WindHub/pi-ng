import { Injectable, provide } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ApiService } from '../utils';
import { User, Login } from '../models';

@Injectable()
export class LoginService {
  private loginUrl = this.api.api_url + '/users/login';
  private logoutUrl = this.api.api_url + '/users/logout';
  private myUrl = this.api.api_url + '/users/me';
  public isLoggedIn = false;
  public user: User;

  private static instance: LoginService = null;

  public static getInstance(http, api): LoginService {
    if (LoginService.instance === null) {
       LoginService.instance = new LoginService(http, api);
    }
    return LoginService.instance;
  }
  
  public login(login: Login): Observable<Login> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.loginUrl, JSON.stringify(login), {headers: headers})
      .map(this.extractData);
  }

  public logout(): Observable<Login> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.logoutUrl, "", {headers: headers})
      .map(this.extractData);
  }

  public checkLoggedIn(): Observable<{}> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let request = this.http
      .post(this.myUrl, "", {headers: headers})
      .map(this.extractData)
      .share();
    request.subscribe(data => {
      this.isLoggedIn = true;
      this.user = <User>(data.user);
    }, err => {
      this.isLoggedIn = false;
      this.user = null;
    });
    return request;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  constructor(
    private http: Http,
    private api: ApiService
  ) {
    this.isLoggedIn = false;
    this.checkLoggedIn();
  }
}

export const LOGIN_SERVICE_PROVIDER = provide(LoginService, {
  deps: [Http, ApiService],
  useFactory: (http: Http, api: ApiService): LoginService => LoginService.getInstance(http, api)
});
