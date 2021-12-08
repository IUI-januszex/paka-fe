import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ILocalWarehouse } from 'src/app/interface/warehouse/localwarehouse';
import { ILocalWarehouseRequest } from 'src/app/interface/warehouse/localwarehouserequest';
import { LocalWarehouseService } from 'src/app/services/local-warehouse.service';

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
    if(this.warehouseData != null){
      console.log(this.warehouseData);
      
    this.localhostService.putDataEdit(instance,this.warehouseData.idWarehouse).subscribe((e)=>{
      this.succes.emit(e);
    })
  }
  } 
}
