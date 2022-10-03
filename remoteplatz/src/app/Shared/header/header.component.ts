import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router, public auth: AuthService) {}
  login(): void {
    this.router.navigate(['/login']);
  }
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
