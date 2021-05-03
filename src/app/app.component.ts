import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private breakObserver:BreakpointObserver, private route:Router){}
  title = 'angualr-material-playbook';
  get isMobile() {
    if (this.breakObserver.isMatched('(max-width: 800px)')) {
      return true;
    } else {
      return false;
    }
  }
  
  ngOnInit(){
    //this.route.navigate(['welcome'])
  }
}
