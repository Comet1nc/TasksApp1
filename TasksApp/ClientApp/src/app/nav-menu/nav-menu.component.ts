import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  isAuthorized = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthorized.subscribe(() => {
      this.isAuthorized = true;
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    window.location.reload();
  }
}
