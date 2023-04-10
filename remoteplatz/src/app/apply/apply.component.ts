import { Component, OnInit } from '@angular/core';
import { JobsService } from '../Service/jobs.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  param!: any
  data!: any
  constructor(private jobService: JobsService) { }

  ngOnInit(): void {
    this.param = localStorage.getItem("param")
    console.log(this.param);
    this.jobService.getJob(this.param).subscribe((data) => {
      console.log(data);
    this.data = data
    
    });
    
  }

}
