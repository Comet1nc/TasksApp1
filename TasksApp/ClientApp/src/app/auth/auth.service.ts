import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    public http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string,
    public router: Router
  ) {}

  isAuthorized = new Subject<void>();

  token!: string;

  login(name: string, pass: string) {
    this.http
      .post(
        this.baseUrl + 'api/account/login',
        {
          Name: name,
          Password: pass,
        },
        { responseType: 'text' }
      )
      .subscribe(
        (result) => {
          this.token = result;

          this.isAuthorized.next();
          // setTimeout(() => {
          // }, 1000);

          // console.log(this.token);
        },
        (error) => console.error(error)
      );
  }

  register(name: string, pass: string) {
    this.http
      .post(this.baseUrl + 'api/account/register', {
        Name: name,
        Password: pass,
      })
      .subscribe(
        (result) => {},
        (error) => console.error(error)
      );
  }
}
