import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  constructor(private formBuilder:FormBuilder, private globalWarehouseService:GlobalWarehouseService) {
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
    if(this.warehouseData != null){
      console.log(this.warehouseData);
      
    this.globalWarehouseService.putDataEdit(instance,this.warehouseData.idWarehouse).subscribe((e)=>{
      this.succes.emit(e);
    })
  }
  } 

}
