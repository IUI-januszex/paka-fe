import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'new-global-warehouse',
  templateUrl: './new-global-warehouse.component.html',
  styleUrls: ['./new-global-warehouse.component.scss']
})
export class NewGlobalWarehouseComponent implements OnInit {

  globalWarehouseForm: FormGroup;

  constructor(private formBuilder:FormBuilder) {
    this.globalWarehouseForm = this.formBuilder.group({
      idGlobalWarehouse: formBuilder.control(''),
      city: formBuilder.control(''),
      street: formBuilder.control(''),
      number: formBuilder.control(''),
      postalCode: formBuilder.control(''),
      active: [false]
    })
   }
  ngOnInit(): void {
  }
  onSubmit(){

  }

}
