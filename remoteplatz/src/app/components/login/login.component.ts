import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { JobsService } from '../../Service/jobs.service';
import { IUser } from 'src/app/Interface/IUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, public JobsService: JobsService, AuthService: AuthService) {}

  ngOnInit(): void {}
  onLogin(form: NgForm) {
    console.log(form.value);
    
    this.JobsService.login(form.value.email, form.value.password)
  }
}
