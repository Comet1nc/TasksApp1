import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loginName!: string;
  loginPassword!: string;

  regName!: string;
  regPassword!: string;

  constructor(public authService: AuthService, public router: Router) {}

  SubmitLogin() {
    this.authService.login(this.loginName, this.loginPassword);

    this.loginName = '';
    this.loginPassword = '';
    this.router.navigate(['/']);
  }

  SubmitRegistration() {
    this.authService.register(this.regName, this.regPassword);

    this.regName = '';
    this.regPassword = '';
  }
}
