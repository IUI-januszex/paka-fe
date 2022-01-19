import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ILocalWarehouse } from 'src/app/interface/warehouse/localwarehouse';
import { ILocalWarehouseRequest } from 'src/app/interface/warehouse/localwarehouserequest';
import { IPostalCode } from 'src/app/interface/warehouse/postalcode';
import { LocalWarehouseService } from 'src/app/services/local-warehouse.service';
import { EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'new-warehouse',
  templateUrl: './new-warehouse.component.html',
  styleUrls: ['./new-warehouse.component.scss']
})
export class NewWarehouseComponent implements OnInit {

  @Output()
  succes = new EventEmitter<ILocalWarehouse>();

  @Input()
  warehouseData?: ILocalWarehouse | null;

  submitted: boolean = false;

  warehouseForm: FormGroup;

  constructor(private formBuilder:FormBuilder,
     private localhostService:LocalWarehouseService,
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
    if (!this.warehouseForm.valid) {
      return;
    }else{
    console.log(instance);
    this.localhostService.postData(instance).subscribe((e)=>{
      this.succes.emit(e);
    },error =>{
     this.toastService.showError(error);
    })
    }
  } 
  get ctls() {
    return this.warehouseForm.controls;
  }
}