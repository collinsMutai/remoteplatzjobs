import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IJobs } from '../../Interface/Ijobs';
import { JobsService } from '../../Service/jobs.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  id!: number;
  job!: any;
  param!: any

  constructor(private route: ActivatedRoute, private jobService: JobsService, private router: Router) {}

  ngOnInit(): void {
    this.param =this.route.params.subscribe((param) => {
      // console.log(param);
      localStorage.setItem("param", param['id'])
      this.id = param['id'];
      this.jobService.getJob(this.id).subscribe((data) => {
        console.log(data);
        this.job = data;
      });
    });
  }
  onApply() {
    console.log('clicked');
    this.router.navigate(["/apply"])
    
    
  }
}
