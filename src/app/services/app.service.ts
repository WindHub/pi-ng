import { Injectable, provide } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ApiService } from '../utils';
import { App, AppToken } from '../models';

@Injectable()
export class AppService {
  private appUrl = this.api.api_url + '/apps';

  public getApps(): Observable<App[]> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .get(this.appUrl, {headers: headers})
      .map(this.extractData);
  }

  public getToken(app: App): Observable<AppToken> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.appUrl + '/' + app.id, "", {headers: headers})
      .map(this.extractData);
  }

  public saveToken(appToken: AppToken): Observable<{}> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(appToken.app.papi_url + '/token', JSON.stringify({ token: appToken.token }), {headers: headers})
      .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  constructor(
    private http: Http,
    private api: ApiService
  ) {
  }
}
