import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IGlobalWarehouse } from 'src/app/interface/warehouse/globalwarehouse';
import { GlobalWarehouseService } from 'src/app/services/global-warehouse.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'global-warehouse',
  templateUrl: './global-warehouse.component.html',
  styleUrls: ['./global-warehouse.component.scss']
})
export class GlobalWarehouseComponent implements OnInit {


  warehouse: IGlobalWarehouse | null = null;
  data: Array<IGlobalWarehouse>
  page: number = 1

  constructor(private globalWarehouseService: GlobalWarehouseService,
    private modalService: NgbModal,
    private modal: NgbActiveModal,
    private toastService: ToastService) {
    this.data = new Array<IGlobalWarehouse>()
  }

  open(content: any) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  openDelete(content: any, globalWarehouse: IGlobalWarehouse) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getGlobalWarehouses() {
    this.globalWarehouseService.getData().subscribe((data: IGlobalWarehouse[]) => {
      this.data = data;
    }, error => {
      this.toastService.showError(error);
    });
  }


  deleteWarehouse(id: number) {
    this.globalWarehouseService.deleteData(id).subscribe(() => {
      this.modal.close();
      this.toastService.showSuccess();
      this.getGlobalWarehouses();
    }, error => {
      this.toastService.showError(error);
    });
  }

  stateChange(data: IGlobalWarehouse) {
    data.active = !data.active
    this.globalWarehouseService.putData(data).subscribe(() => { 
      this.getGlobalWarehouses();
      this.toastService.showSuccess();
    },
      error => {
        this.toastService.showError(error);
      })
  }

  onWarehouseAdd(globalwarehouse: IGlobalWarehouse) {
    this.modal.close();
    this.toastService.showSuccess();
    this.getGlobalWarehouses()
  }

  onWarehouseEdit(globalwarehouse: IGlobalWarehouse) {
    this.modal.close();
    this.toastService.showSuccess();
    this.getGlobalWarehouses()
  }

  setWarehouse(warehouse: IGlobalWarehouse) {
    this.warehouse = warehouse;
  }

  ngOnInit(): void {
    this.getGlobalWarehouses()
  }

}
