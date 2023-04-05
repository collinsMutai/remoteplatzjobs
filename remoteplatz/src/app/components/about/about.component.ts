import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private jobService: JobsService) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
      this.jobService.getJob(this.id).subscribe((data) => {
        console.log(data);
        this.job = data;
      });
    });
  }
}
