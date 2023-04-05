import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { JobsService } from 'src/app/Service/jobs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs!: Subscription;
  returnUrl!: string;

  constructor(
    private router: Router,
    private JobsService: JobsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  
  }
 
  login(): void {
    this.router.navigate(['/login']);
     this.authListenerSubs = this.JobsService.getAuthStatusListener().subscribe(
       (isAuthenticated) => {
         console.log(isAuthenticated);
         
         this.userIsAuthenticated = isAuthenticated;
        //  console.log(this.userIsAuthenticated);
         
         // this.router.navigate(['/']);
         this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
         this.router.navigateByUrl(this.returnUrl);

         console.log('user logged in');
       }
     );
  }
  logout(): void {
    this.JobsService.onLogout();

    this.userIsAuthenticated = true;
    this.router.navigate(['/']);
  }
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
