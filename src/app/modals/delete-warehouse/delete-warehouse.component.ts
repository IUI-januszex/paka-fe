import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'delete-warehouse',
  templateUrl: './delete-warehouse.component.html',
  styleUrls: ['./delete-warehouse.component.scss']
})
export class DeleteWarehouseComponent implements OnInit {

  @Input() warehouse = '';
  
  constructor() { 
 
  }

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
