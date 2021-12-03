import { Component, OnInit } from '@angular/core';
import { LocalWarehouseService } from 'src/app/services/local-warehouse.service';
import { ILocalWarehouse } from 'src/app/interface/warehouse/localwarehouse';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'local-warehouse',
  templateUrl: './local-warehouse.component.html',
  styleUrls: ['./local-warehouse.component.scss']
})
export class LocalWarehouseComponent implements OnInit {
  
  warehouse: any
  data: Array<ILocalWarehouse>
  page: number = 1
  
  
  constructor(private localWarehouseService:LocalWarehouseService,private modalService: NgbModal,
    private modal: NgbActiveModal) {
      this.data = new Array<ILocalWarehouse>()
    }

  
    open(content: any) {
      this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    }

    posted(data:any){
      if(data==true){
      this.getLocalWarehouses()
      this.modal.close()
      }
    }
    
    getLocalWarehouses(){
      this.localWarehouseService.getData().subscribe((data: ILocalWarehouse[]) => {        
        console.log(data)
        this.data = data
        console.log(this.data);
        
      })
    }

    stateChange(data: ILocalWarehouse){
      data.active = !data.active
      this.localWarehouseService.putData(data).subscribe()
    }

    setWarehouse(warehouse: ILocalWarehouse){
      this.warehouse = warehouse;
    }
    
    
    ngOnInit(): void {
    this.getLocalWarehouses()
  }


}


