import { Component, OnInit } from '@angular/core';
import { LocalWarehouseService } from 'src/app/services/local-warehouse.service';
import { ILocalWarehouse } from 'src/app/interface/warehouse/localwarehouse';

@Component({
  selector: 'local-warehouse',
  templateUrl: './local-warehouse.component.html',
  styleUrls: ['./local-warehouse.component.scss']
})
export class LocalWarehouseComponent implements OnInit {
  
  data: Array<ILocalWarehouse>
  totalRecords: Number = 0
  page:Number = 1
  
  constructor(private localWarehouseService:LocalWarehouseService) {
      this.data = new Array<ILocalWarehouse>()
      this.getLocalWarehouses()
   }

   getLocalWarehouses(){
     this.localWarehouseService.getData().subscribe((data) => {
       this.data = data.results
       this.totalRecords = data.results.lenght
     })
   }

  
  ngOnInit(): void {
  }

}


