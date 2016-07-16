import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../utils';
import { User, Login } from '../models';

@Injectable()
export class LoginService {
  private loginUrl = this.api.api_url + '/users/login';
  private myUrl = this.api.api_url + '/users/me';
  public isLoggedIn = false;
  public user: User;

  public login(login: Login): Observable<Login> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.loginUrl, JSON.stringify(login), {headers: headers})
      .map(this.extractData);
  }

  public checkLoggedIn(): Observable<{}> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let request = this.http
      .post(this.myUrl, "", {headers: headers})
      .map(this.extractData);
    request.subscribe(data => {
      this.isLoggedIn = true;
      this.user = <User>(data.user);
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
