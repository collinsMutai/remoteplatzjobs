import { Injectable } from '@angular/core';
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
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  returnUrl!: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  login(email: string, password: string) {
    const userData: IUser = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number }>(
        `${this.mongodbUrl}/login`,
        userData
      )
      .subscribe((response) => {
        console.log(response);

        const token = response.token;
        this.token = token;
        // localStorage.setItem('token', token);
        if (token) {
          const expiresInDuration = response.expiresIn;
          console.log(expiresInDuration);
          this.setAuthTimer(expiresInDuration);

          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          this.returnUrl =
            this.route.snapshot.queryParams['returnUrl'] || '/apply';
          this.router.navigateByUrl(this.returnUrl);
        }
      });
  }
  log_out() {
    localStorage.clear();
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.log_out();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }
}
