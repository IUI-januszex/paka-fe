import { Component, OnInit } from '@angular/core';
import { LocalWarehouseService } from 'src/app/services/local-warehouse.service';
import { ILocalWarehouse } from 'src/app/interface/warehouse/localwarehouse';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IGlobalWarehouse } from 'src/app/interface/warehouse/globalwarehouse';
import { GlobalWarehouseService } from 'src/app/services/global-warehouse.service';

@Component({
  selector: 'local-warehouse',
  templateUrl: './local-warehouse.component.html',
  styleUrls: ['./local-warehouse.component.scss']
})
export class LocalWarehouseComponent implements OnInit {
  
  warehouse: ILocalWarehouse | null = null;
  globalWarehouse: IGlobalWarehouse | null = null;
  data: Array<ILocalWarehouse>
  page: number = 1
  
  
  constructor(private localWarehouseService:LocalWarehouseService,private modalService: NgbModal,
    private modal: NgbActiveModal,private globalService:GlobalWarehouseService) {
      this.data = new Array<ILocalWarehouse>()
    }

    open(content: any) {
      this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    }

    openDelete(content: any,localWarehouse: ILocalWarehouse) {
      this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    }
    
    getLocalWarehouses(){
      this.localWarehouseService.getData().subscribe((data: ILocalWarehouse[]) => {        
        this.data = data        
      })
    }
  

    deleteWarehouse(id: number){
      console.log("powinienem usunac " + id);
      this.localWarehouseService.deleteData(id).subscribe(()=>{
        this.modal.close();
        this.getLocalWarehouses();
      }
      );
    }

    setGlobalWarehouse(id: number,content: any){
      this.globalService.getDataById(id).subscribe((data) => {
        this.globalWarehouse = data
        this.modal = this.modalService.open(content)
      })
    }

    stateChange(data: ILocalWarehouse){
      data.active = !data.active
      this.localWarehouseService.putData(data).subscribe()
    }

    onWarehouseAdd(localwarehouse: ILocalWarehouse){
      this.modal.close();
      this.getLocalWarehouses()
    }

    onWarehouseEdit(localwarehouse: ILocalWarehouse){
      this.modal.close();
      this.getLocalWarehouses()
    }

    setWarehouse(warehouse: ILocalWarehouse){
      this.warehouse = warehouse;
    }
    
    
    ngOnInit(): void {
    this.getLocalWarehouses()
  }


}


