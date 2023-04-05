import { Injectable} from '@angular/core';
import { IJobs } from '../Interface/Ijobs';

import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../Interface/IUser';

import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  baseUrl: string = 'http://localhost:3000';
  mongodbUrl: string = 'http://localhost:3002/api/user';

  private isAuthenticated = false;
  private token!: string;
  private authStatusListener = new Subject<boolean>();
  returnUrl!: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  
  onLogout() {
    
    localStorage.clear();
    // this.isAuthenticated = true
  this.router.navigate(['/']);
  }
  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getJobs(): Observable<IJobs[]> {
    return this.http.get<IJobs[]>(`${this.baseUrl}/jobs`);
  }
  getJob(id: number) {
    return this.http.get(`${this.baseUrl}/jobs/${id}`);
  }

  createUser(email: string, password: string) {
    const userData: IUser = { email: email, password: password };
    this.http
      .post(`${this.mongodbUrl}/register`, userData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const userData: IUser = { email: email, password: password };
    this.http
      .post<{ token: string }>(`${this.mongodbUrl}/login`, userData)
      .subscribe((response) => {
        console.log(response);

        const token = response.token;
        this.token = token;
        if (token) {
          localStorage.setItem('token', token);
          this.isAuthenticated = true;
          this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(this.returnUrl);
          this.authStatusListener.next(true);
        }
      });
  }
}
