import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IGlobalWarehouse } from 'src/app/interface/warehouse/globalwarehouse';
import { IGlobalWarehouseRequest } from 'src/app/interface/warehouse/globalwarehouserequest';
import { GlobalWarehouseService } from 'src/app/services/global-warehouse.service';

@Component({
  selector: 'edit-global-warehouse',
  templateUrl: './edit-global-warehouse.component.html',
  styleUrls: ['./edit-global-warehouse.component.scss']
})
export class EditGlobalWarehouseComponent implements OnInit {


  @Output()
  succes = new EventEmitter<IGlobalWarehouse>();

  @Input()
  warehouseData?: IGlobalWarehouse | null;

  warehouseForm: FormGroup;

  submitted: boolean = false;

  constructor(private formBuilder:FormBuilder, private globalWarehouseService:GlobalWarehouseService) {
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
    if(this.warehouseData != null){      
    this.globalWarehouseService.putDataEdit(instance,this.warehouseData.idWarehouse).subscribe((e)=>{
      this.succes.emit(e);
    },error =>{
      alert(error.error.message)
    })
  }
  }
  } 

  get ctls() {
    return this.warehouseForm.controls;
  }

}
