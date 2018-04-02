import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()

export class AuthService {

  constructor(private  http: HttpClient) {}

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-type':'Application/json'});
    return this.http.post('http://localhost:3000/user', body, {headers: headers})
      .map(response => response)
      .catch((error: Response) => Observable.throw(error));
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-type':'Application/json'});
    return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
      .map(response => response)
      .catch((error: Response) => Observable.throw(error));
  }

  logout() {
    localStorage.clear();
  }
}
