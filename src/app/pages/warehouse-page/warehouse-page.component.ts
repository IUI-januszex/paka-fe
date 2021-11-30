import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'warehouse-page',
  templateUrl: './warehouse-page.component.html',
  styleUrls: ['./warehouse-page.component.scss']
})
export class WarehousePageComponent implements OnInit {

  globalWarehouses:any = []

  constructor() {}

  ngOnInit(): void {
  }
}


