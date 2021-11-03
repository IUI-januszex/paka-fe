import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'new-warehouse',
  templateUrl: './new-warehouse.component.html',
  styleUrls: ['./new-warehouse.component.scss']
})
export class NewWarehouseComponent implements OnInit {

  warehouseForm: FormGroup;

  constructor(private formBuilder:FormBuilder) {
    this.warehouseForm = this.formBuilder.group({
      idLocalWarehouse: formBuilder.control(''),
      city: formBuilder.control(''),
      street: formBuilder.control(''),
      number: formBuilder.control(''),
      postalCode: formBuilder.control(''),
      idGlobalWarehouse: formBuilder.control(''),
      active: [false]
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){

  }
}
