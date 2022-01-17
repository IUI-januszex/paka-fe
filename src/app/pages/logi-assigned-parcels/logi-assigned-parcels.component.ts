import { IWarehouseParcel } from './../../interface/parcel/warehouseparcels';
import { ILogisticianData } from './../../interface/user/logisticianuser';
import { ParcelService } from './../../services/parcel.service';
import { UserService } from './../../services/user.service';
import { IParcelDetail } from './../../interface/parcel/parceldetail';
import { Component, OnInit } from '@angular/core';
import { OperationType } from 'src/app/interface/parcel/operationtype';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IParcelState } from 'src/app/interface/parcel/parcelstate';

@Component({
  selector: 'logi-assigned-parcels',
  templateUrl: './logi-assigned-parcels.component.html',
  styleUrls: ['./logi-assigned-parcels.component.scss']
})
export class LogiAssignedParcelsComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private modal: NgbActiveModal,private userService:UserService, private parcelService: ParcelService) { 
      this.isAtWarehouse = true;
    }

  isAtWarehouse: boolean;

  courierId: string = "";

  courierList: ILogisticianData[] = [];

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
    },error =>{
      alert(error.error.message);
    });
  }

  open(content: any) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }


  
  getListOfCouriers(){
    if(this.logisticianData)
    this.userService.getCourierList(this.logisticianData.warehouseType, this.logisticianData.warehouseId).subscribe((data: ILogisticianData[])=>{
      this.courierList = data;
    },error=>{
      alert(error.error.message);
    })
  }

  changeSite(bool: boolean){
    this.isAtWarehouse = bool;
  }


  getData(){
    if(this.logisticianData){
      if(this.logisticianData.warehouseType == "GLOBAL"){
        this.parcelService.getGlobalWarehouseParcels(this.logisticianData.warehouseId).subscribe((data: IWarehouseParcel)=>{
          console.log(data);
          
          this.courierParcels = data.parcelsAssigned;
          this.warehouseParcels = data.parcelAtWarehouse;
        })
      }if (this.logisticianData.warehouseType == "LOCAL") {
        this.parcelService.getLocalWarehouseParcels(this.logisticianData.warehouseId).subscribe((data: IWarehouseParcel)=>{
          console.log(data);
          this.courierParcels = data.parcelsAssigned;
          this.warehouseParcels = data.parcelAtWarehouse;
        })
      } else {
        alert("Undefined");
      }
    }
  }

  nameOperation(operationType: OperationType): string{     
   return this.parcelService.nameOperation(operationType);  
  }

  doOperation(operationType: OperationType, parcelId:number,curierId:string, currentState: IParcelState){
    this.parcelService.doOperation(operationType,parcelId,curierId,currentState);
  }

  updateCourierId(e: any){
    console.log(e.target.value);
    this.courierId = e.target.value
  }

}
