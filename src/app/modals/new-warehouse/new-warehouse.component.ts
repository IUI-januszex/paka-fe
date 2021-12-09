import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ILocalWarehouse } from 'src/app/interface/warehouse/localwarehouse';
import { ILocalWarehouseRequest } from 'src/app/interface/warehouse/localwarehouserequest';
import { IPostalCode } from 'src/app/interface/warehouse/postalcode';
import { LocalWarehouseService } from 'src/app/services/local-warehouse.service';
import { EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
    this.localhostService.postData(instance).subscribe((e)=>{
      this.succes.emit(e);
    })
  
  } 

}