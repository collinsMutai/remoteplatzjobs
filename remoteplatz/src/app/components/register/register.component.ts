import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { JobsService } from '../../Service/jobs.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(public JobsService: JobsService) {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    // console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.JobsService.createUser(form.value.email, form.value.password);
  }
}
