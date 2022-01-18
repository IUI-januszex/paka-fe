import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements AfterViewInit {

  constructor(private router: Router) { }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.router.navigate(["/"]);
    },1000)
  }


}
