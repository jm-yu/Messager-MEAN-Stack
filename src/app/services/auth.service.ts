import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {ErrorService} from './error.service';
@Injectable()

export class AuthService {

  constructor(private  http: HttpClient, private errorService: ErrorService) {}

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-type':'Application/json'});
    return this.http.post('http://localhost:3000/user', body, {headers: headers})
      .catch((err: HttpErrorResponse) => {
        this.errorService.handleError(err.error);
        return Observable.throw(err.error);
      });
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-type':'Application/json'});
    return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
      .catch((err: HttpErrorResponse) => {
        this.errorService.handleError(err.error);
        return Observable.throw(err.error);
      });
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn(){
    return localStorage.getItem('token') !== null;
  }
}
