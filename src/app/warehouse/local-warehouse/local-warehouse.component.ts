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
  page: number = 1
  
  constructor(private localWarehouseService:LocalWarehouseService) {
      this.data = new Array<ILocalWarehouse>()
    }
    
    getLocalWarehouses(){
      this.localWarehouseService.getData().subscribe((data: ILocalWarehouse[]) => {        
        console.log(data)
        this.data = data
        console.log(this.data);
        
      })
    }
    
    
    ngOnInit(): void {
    this.getLocalWarehouses()
  }


}


