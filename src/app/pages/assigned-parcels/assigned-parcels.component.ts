import { OperationType } from './../../interface/parcel/operationtype';
import { IParcelPayRequest } from './../../interface/parcel/parcelpayrequest';
import { IParcelDetail } from './../../interface/parcel/parceldetail';
import { ParcelService } from './../../services/parcel.service';
import { ICourierParcels } from './../../interface/parcel/courierparcels';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'assigned-parcels',
  templateUrl: './assigned-parcels.component.html',
  styleUrls: ['./assigned-parcels.component.scss']
})
export class AssignedParcelsComponent implements OnInit {

  isAssigned: boolean;

  data: ICourierParcels | null = null
  assignedParcels: IParcelDetail[] | null = null
  pickedUpParcels: IParcelDetail[] | null = null
  pageAssigned: number = 1
  pagePickedUp: number = 1

  constructor(private modalService: NgbModal,
    private modal: NgbActiveModal, private parcelService: ParcelService) {
      this.isAssigned = true;
     }

  changeSite(bool: boolean){
    this.isAssigned = bool;
  }

  ngOnInit(): void {
    this.getData();
  }

  kurierId = "43557ea5-69c4-4f89-b062-bcd63dfb4f1d"

  getData(){
    this.parcelService.getParcelsForCourier().subscribe((data: ICourierParcels)=>{
      this.pickedUpParcels = data.pickedUpParcels;
      this.assignedParcels = data.assignedParcels;
      console.log(data);
      
    },error=>{
      alert(error.error.message);
    })
  }

  setParcelPaid(parcel: IParcelDetail){
    this.parcelService.putPayParcel(parcel.id).subscribe(()=>{
    },error=>{
      alert(error.error.message);
    })
  }

  setFeePaid(parcel: IParcelDetail){
    this.parcelService.putPayFee(parcel.id).subscribe(()=>{
      alert("Oplacono fee");
    },error=>{
      alert(error.error.message);
    })
  }

  setParcelDelivered(parcel: IParcelDetail){
    this.parcelService.postDeliverToClient(parcel.id).subscribe(()=>{

    },error=>{
      alert(error.error.message);
    })
  }
  
  deliveryAttempt(parcel: IParcelDetail){
    this.parcelService.postAttempts(parcel.id).subscribe(()=>{

    },error=>{
      alert(error.error.message);
    })
  }

  nameOperation(operationType: OperationType): string{     
    return this.parcelService.nameOperation(operationType);  
   }

  doOperation(operationType: OperationType, parcel: IParcelDetail){       
    console.log("operation:" + operationType);
     
    switch(operationType.toString()){
    case "PICKUP":
       "Pick up"
      break;

    case "PAY_FEE":
      this.setFeePaid(parcel);
    break;

    case "ASSIGN_TO_COURIER":
       "Assign to courier"
      break;

    case "DELETE":
       "Delete"
      break;

    case "DELIVERY_ATTEMPT":
      this.deliveryAttempt(parcel);
      break;
    case "DELIVER_TO_CLIENT":
      this.setParcelDelivered(parcel);
      break;
    case "DELIVER_TO_WAREHOUSE":
       "Deliver to warehouse"
       break;

    case "EDIT":
       "Eddit"
       break;

    case "NO_OPERATION":
      break;

    case "PAY_PARCEL":
      this.setParcelPaid(parcel)
      break;

    default:
      break;
    }
  }

  checkOperation(parcel:IParcelDetail, operation: OperationType){
    
}
}
