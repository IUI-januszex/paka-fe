import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'warehouse-page',
  templateUrl: './warehouse-page.component.html',
  styleUrls: ['./warehouse-page.component.scss']
})
export class WarehousePageComponent implements OnInit {

  globalWarehouses:any = []

  constructor(private router:Router) {}

  ngOnInit(): void {
    this.router.navigate(['/warehouse/local-warehouse']);
  }
}


