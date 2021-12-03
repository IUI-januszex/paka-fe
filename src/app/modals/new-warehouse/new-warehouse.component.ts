import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ILocalWarehouse } from 'src/app/interface/warehouse/localwarehouse';
import { ILocalWarehouseRequest } from 'src/app/interface/warehouse/localwarehouserequest';
import { LocalWarehouseService } from 'src/app/services/local-warehouse.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'new-warehouse',
  templateUrl: './new-warehouse.component.html',
  styleUrls: ['./new-warehouse.component.scss']
})
export class NewWarehouseComponent implements OnInit {

  @Output() added = new EventEmitter<boolean>()

  warehouseForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private localhostService:LocalWarehouseService) {
    this.warehouseForm = this.formBuilder.group({
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

  onSubmit(instance: ILocalWarehouseRequest){
    console.log(instance);
    
    this.localhostService.postData(instance).subscribe(()=>{
      this.added.emit(true)
    },() => this.added.emit(false))
  } 
}