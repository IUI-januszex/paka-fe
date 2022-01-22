import { ToastService } from './../../services/toast.service';
import { IOperation } from './../../interface/parcel/operation';
import { IWarehouseParcel } from './../../interface/parcel/warehouseparcels';
import { ILogisticianData } from './../../interface/user/logisticianuser';
import { ParcelService } from './../../services/parcel.service';
import { UserService } from './../../services/user.service';
import { IParcelDetail } from './../../interface/parcel/parceldetail';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { OperationType } from 'src/app/interface/parcel/operationtype';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'logi-assigned-parcels',
  templateUrl: './logi-assigned-parcels.component.html',
  styleUrls: ['./logi-assigned-parcels.component.scss']
})
export class LogiAssignedParcelsComponent implements OnInit {

  @ViewChild("setCourier")
  modalContent!: TemplateRef<any>;

  constructor(private modalService: NgbModal,private toastService: ToastService,
    private modal: NgbActiveModal,private userService:UserService, private parcelService: ParcelService) { 
      this.isAtWarehouse = true;
    }

  isAtWarehouse: boolean;

  courierId: string = "";

  parcelForOperation: IParcelDetail | null = null;

  courierList: ILogisticianData[] = [];

  courier = <ILogisticianData>{};

  courierParcels: IParcelDetail[] = [];
  warehouseParcels: IParcelDetail[] = [];

  logisticianData: ILogisticianData | null = null;

  warehousePage: number = 1
  courierPage: number = 1

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userService.getLogistician().subscribe((data: ILogisticianData) =>{
      this.logisticianData = data;      
      this.getData();
      this.getListOfCouriers();
    },error =>{
      this.toastService.showError(error)
    });
  }

  open(content: any) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'})
  }

  setParcel(parcel: IParcelDetail){
    this.parcelForOperation = parcel;
  }
  
  getListOfCouriers(){
    if(this.logisticianData)
    this.userService.getCourierList(this.logisticianData.warehouseType, this.logisticianData.warehouseId).subscribe((data: ILogisticianData[])=>{
      this.courierList = data;      
    },error=>{
      this.toastService.showError(error)
    })
  }

  changeSite(bool: boolean){
    this.isAtWarehouse = bool;
  }


  getData(){
    if(this.logisticianData){
      if(this.logisticianData.warehouseType == "GLOBAL"){
        this.parcelService.getGlobalWarehouseParcels(this.logisticianData.warehouseId).subscribe((data: IWarehouseParcel)=>{          
          this.courierParcels = data.parcelsAssigned;
          this.warehouseParcels = data.parcelsAtWarehouse;
        }, error=>{
          this.toastService.showError(error)
        })
      }if (this.logisticianData.warehouseType == "LOCAL") {
        this.parcelService.getLocalWarehouseParcels(this.logisticianData.warehouseId).subscribe((data: IWarehouseParcel)=>{
          this.courierParcels = data.parcelsAssigned;
          this.warehouseParcels = data.parcelsAtWarehouse;
        }, error=>{
          this.toastService.showError(error)
        })
      } else {
      }
    }
  }

  nameOperation(operationType: OperationType): string{     
   return this.parcelService.nameOperation(operationType);  
  }



  doOperation(operation: IOperation, parcelId:number){   
    if(operation.operationType.toString() == "ASSIGN_TO_COURIER" ){
      this.assignCourier( parcelId);
    }else{
      this.parcelService.doOperation(operation,parcelId,()=> this.getData());
    }
  }

  onGetCourier(courier: ILogisticianData){
    this.courier = courier;
    this.modal.close();
  }

  updateCourierId(e: any){    
    this.courierId = e.target.value
  }



  assignCourier(parcelId:number){   
    if(this.courier){
      this.parcelService.assigneToCourier(parcelId,this.courier.id).subscribe(()=>{
        this.toastService.showSuccess();
        this.getData();        
      },error=>{
        this.toastService.showError(error);
      });
    }else{
    }
 
  }

}
