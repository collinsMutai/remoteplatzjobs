import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  @ViewChild('form') form!: NgForm;
 
  constructor( private router:Router, public auth:AuthService) {}

  ngOnInit(): void {
    
  }
  onSubmit() {
    console.log(this.form.value);
  }
  login(): void{
    this.auth.loginWithRedirect()
  }
 
}
