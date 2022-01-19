import { Component, OnInit } from '@angular/core';
import { LocalWarehouseService } from 'src/app/services/local-warehouse.service';
import { ILocalWarehouse } from 'src/app/interface/warehouse/localwarehouse';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IGlobalWarehouse } from 'src/app/interface/warehouse/globalwarehouse';
import { GlobalWarehouseService } from 'src/app/services/global-warehouse.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'local-warehouse',
  templateUrl: './local-warehouse.component.html',
  styleUrls: ['./local-warehouse.component.scss']
})
export class LocalWarehouseComponent implements OnInit {

  warehouse: ILocalWarehouse | null = null;
  globalWarehouse: IGlobalWarehouse | null = null;
  warehouseId: number | null = null;
  data: Array<ILocalWarehouse>
  page: number = 1


  constructor(private localWarehouseService: LocalWarehouseService,
     private modalService: NgbModal,
    private modal: NgbActiveModal,
     private globalService: GlobalWarehouseService,
     private toastService: ToastService) {
    this.data = new Array<ILocalWarehouse>()
  }

  open(content: any) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  openDelete(content: any, localWarehouse: ILocalWarehouse) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  getLocalWarehouses() {
    this.localWarehouseService.getData().subscribe((data: ILocalWarehouse[]) => {
      data.sort((a, b) => a.idWarehouse - b.idWarehouse);
      this.data = data;
    }, error => {
      this.toastService.showError(error);
    })
  }


  deleteWarehouse(id: number) {
    this.localWarehouseService.deleteData(id).subscribe(() => {
      this.modal.close();
      this.getLocalWarehouses();
      this.toastService.showSuccess();
    }, error => {
      alert(error.error.message)
    }
    );
  }

  setGlobalWarehouse(id: number, content: any) {
    this.globalService.getDataById(id).subscribe((data) => {
      this.globalWarehouse = data;
      this.modal = this.modalService.open(content);
    }, error => {
      this.toastService.showError(error);
    })
  }

  stateChange(data: ILocalWarehouse) {
    data.active = !data.active
    this.localWarehouseService.putData(data).subscribe(() => {
      this.getLocalWarehouses();
      this.toastService.showSuccess();
     }, error => {
      this.toastService.showError(error);
    })
  }

  onWarehouseAdd(localwarehouse: ILocalWarehouse) {
    this.modal.close();
    this.toastService.showSuccess();
    this.getLocalWarehouses();
  }

  onWarehouseEdit(localwarehouse: ILocalWarehouse) {
    this.modal.close();
    this.toastService.showSuccess();
    this.getLocalWarehouses();
  }

  setWarehouse(warehouse: ILocalWarehouse) {
    this.warehouse = warehouse;
  }

  setWarehouseId(id: number) {
    this.warehouseId = id
  }


  ngOnInit(): void {
    this.getLocalWarehouses()
  }

}


