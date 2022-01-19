import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ILocalWarehouse } from 'src/app/interface/warehouse/localwarehouse';
import { ILocalWarehouseRequest } from 'src/app/interface/warehouse/localwarehouserequest';
import { LocalWarehouseService } from 'src/app/services/local-warehouse.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'edit-warehouse',
  templateUrl: './edit-warehouse.component.html',
  styleUrls: ['./edit-warehouse.component.scss']
})
export class EditWarehouseComponent implements OnInit {

  @Output()
  succes = new EventEmitter<ILocalWarehouse>();

  @Input()
  warehouseData?: ILocalWarehouse | null;

  warehouseForm: FormGroup;

  submitted: boolean = false;

  constructor(private formBuilder:FormBuilder,
     private localWarehouseService:LocalWarehouseService,
     private toastService: ToastService) {
    this.warehouseForm = this.formBuilder.group({
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      postalCode: ['', [Validators.required, Validators.pattern("^([0-9]{2})-([0-9]{3})")]],
      idGlobalWarehouse: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      active: [false]
    })
   }

  ngOnInit(): void {
  }

  onSubmit(instance: ILocalWarehouseRequest){
    this.submitted = true;
    if(!this.warehouseForm.valid) {
      return;
    }else{
    if(this.warehouseData != null){
      console.log(this.warehouseData);
      
    this.localWarehouseService.putDataEdit(instance,this.warehouseData.idWarehouse).subscribe((e)=>{
      this.succes.emit(e);
    },error =>{
      this.toastService.showError(error);
    })
  }
  } 
}

get ctls() {
  return this.warehouseForm.controls;
}
}
