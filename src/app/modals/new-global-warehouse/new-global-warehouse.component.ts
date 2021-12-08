import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  warehouseForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private globalhostService:GlobalWarehouseService) {
    this.warehouseForm = this.formBuilder.group({
      city: formBuilder.control(''),
      street: formBuilder.control(''),
      number: formBuilder.control(''),
      postalCode: formBuilder.control(''),
      active: [false]
    })
   }

  ngOnInit(): void {
  }

  onSubmit(instance: IGlobalWarehouseRequest){
    console.log(instance);
    this.globalhostService.postData(instance).subscribe((e)=>{
      this.succes.emit(e);
    })
  
  } 

}
