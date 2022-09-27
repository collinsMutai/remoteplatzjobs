import { Component, OnInit } from '@angular/core';
import { IJobs } from '../Interface/Ijobs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  status: boolean = false;
  list: any
  selected: any
  filterText:string= ''
  jobs: IJobs[] = [
    {
      "title": "Full Stack JavaScript Developer",
      "location": "Amsterdam, Netherlands",
      "date": "6 days ago",
      "time": "ASAP . GMT +02:00",
      "flag":"fi fi-nl flag"
    },
    {
      "title": "Frontend ReactJs Developer",
      "location": "Riyadh, Saudi Arabia",
      "date": "13 days ago",
      "time": "ASAP . GMT +03:00",
      "flag":"fi fi-sa flag"
    },
    {
      "title": "Java Developer",
      "location": "Riyadh, Saudi Arabia",
      "date": "6 days ago",
      "time": "ASAP . GMT +02:00",
      "flag":"fi fi-sa flag"
    },
    {
      "title": "Senior React Developer",
      "location": "Berlin, Germany",
      "date": "a month ago",
      "time": "Within A Month . GMT +02:00",
      "flag":"fi fi-de flag"
    }
  ]
  constructor() { 
    this.list = [
      'Date posted',
      'Number of Applicants',
      'Location',
      'Urgency'
    ]
  }

  ngOnInit(): void {
  }
  select(item:any) {
    this.selected = item
   
    
  }
  isActive(item: any) {
    
    return this.selected === item
  }

}
