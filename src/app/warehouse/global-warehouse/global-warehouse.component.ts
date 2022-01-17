import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IGlobalWarehouse } from 'src/app/interface/warehouse/globalwarehouse';
import { GlobalWarehouseService } from 'src/app/services/global-warehouse.service';

@Component({
  selector: 'global-warehouse',
  templateUrl: './global-warehouse.component.html',
  styleUrls: ['./global-warehouse.component.scss']
})
export class GlobalWarehouseComponent implements OnInit {


  warehouse: IGlobalWarehouse | null = null;
  data: Array<IGlobalWarehouse>
  page: number = 1

    constructor(private globalWarehouseService:GlobalWarehouseService,private modalService: NgbModal,
    private modal: NgbActiveModal) {
      this.data = new Array<IGlobalWarehouse>()
    }

    open(content: any) {
      this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    }

    openDelete(content: any,globalWarehouse: IGlobalWarehouse) {
      this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }
    
    getGlobalWarehouses(){
      this.globalWarehouseService.getData().subscribe((data: IGlobalWarehouse[]) => {        
        this.data = data        
      },error =>{
        alert(error.error.message)
      });
    }
  

    deleteWarehouse(id: number){
      this.globalWarehouseService.deleteData(id).subscribe(()=>{
        this.modal.close();
        this.getGlobalWarehouses();
      },error =>{
        alert(error.error.message)
      });
    }

    stateChange(data: IGlobalWarehouse){
      data.active = !data.active
      this.globalWarehouseService.putData(data).subscribe(()=>{},
      error =>{
        alert(error.error.message)
      })
    }

    onWarehouseAdd(globalwarehouse: IGlobalWarehouse){
      this.modal.close();
      this.getGlobalWarehouses()
    }

    onWarehouseEdit(globalwarehouse: IGlobalWarehouse){
      this.modal.close();
      this.getGlobalWarehouses()
    }

    setWarehouse(warehouse: IGlobalWarehouse){
      this.warehouse = warehouse;
    }
    
    
    ngOnInit(): void {
    this.getGlobalWarehouses()
  }

}
