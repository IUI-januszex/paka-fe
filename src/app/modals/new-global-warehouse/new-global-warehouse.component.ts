import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGlobalWarehouse } from 'src/app/interface/warehouse/globalwarehouse';
import { IGlobalWarehouseRequest } from 'src/app/interface/warehouse/globalwarehouserequest';
import { GlobalWarehouseService } from 'src/app/services/global-warehouse.service';

@Component({
  selector: 'new-global-warehouse',
  templateUrl: './new-global-warehouse.component.html',
  styleUrls: ['./new-global-warehouse.component.scss']
})
export class NewGlobalWarehouseComponent implements OnInit {

  @Output()
  succes = new EventEmitter<IGlobalWarehouse>();

  @Input()
  warehouseData?: IGlobalWarehouse | null;

  submitted: boolean = false;

  warehouseForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private globalhostService:GlobalWarehouseService) {
    this.warehouseForm = this.formBuilder.group({
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      postalCode: ['', [Validators.required, Validators.pattern("^([0-9]{2})-([0-9]{3})")]],
      active: [false]
    })
   }
   

  ngOnInit(): void {
  }

  onSubmit(instance: IGlobalWarehouseRequest){
    this.submitted = true;
    if (!this.warehouseForm.valid) {
      return;
    }else{
    console.log(instance);
    this.globalhostService.postData(instance).subscribe((e)=>{
      this.succes.emit(e);
    },error =>{
      alert(error.error.message)
    })
    }
  } 

  get ctls() {
    return this.warehouseForm.controls;
  }

}
