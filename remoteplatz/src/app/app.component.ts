import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobsService } from './Service/jobs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs!: Subscription;
  returnUrl!: string;

  constructor(
    private router: Router,
    private JobsService: JobsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.login();
    this.JobsService.autoAuthUser();
  }

  login(): void {
    this.authListenerSubs = this.JobsService.getAuthStatusListener().subscribe(
      (isAuthenticated) => {
        console.log(isAuthenticated);
        this.userIsAuthenticated = isAuthenticated;
      }
    );
  }
  onLogout(): void {
    this.JobsService.log_out();
    this.router.navigate(['/']);
  }
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
