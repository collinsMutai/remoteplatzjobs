import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      fname: new FormControl(null),
      lname: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      country: new FormControl(null),
      phone: new FormControl(null),
      cv: new FormControl(null, [Validators.required]),
      terms: new FormControl(null, [Validators.required]),
    });
  }
  onSubmit() {
    console.log(this.form);
  }
}
