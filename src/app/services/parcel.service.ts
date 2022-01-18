import { IOperation } from './../interface/parcel/operation';
import { ICourierParcels } from './../interface/parcel/courierparcels';
import { IParcelSendRequest } from './../interface/parcel/parcelsendrequest';
import { IParcelDetail } from './../interface/parcel/parceldetail';
import { IParcelPayRequest } from './../interface/parcel/parcelpayrequest';
import { IParcelMoveDateRequest } from './../interface/parcel/parcelmovedaterequest';
import { IParcelBrief } from './../interface/parcel/parcelbrief';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParcelState } from '../interface/parcel/parcelstate';
import { IParcelAttempt } from '../interface/parcel/parcelattempt';
import { IWarehouseParcel } from '../interface/parcel/warehouseparcels';
import { OperationType } from '../interface/parcel/operationtype';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  localUrl = "https://localhost:8080/api/parcel";

  constructor(private http:HttpClient) {}


  nameOperation(operationType: OperationType): string{        
    switch(operationType.toString()){
    case "PICKUP":
      return "Pick up"
      break;

    case "PAY_FEE":
      return "Pay fee"
    break;

    case "ASSIGN_TO_COURIER":
      return "Assign to courier"
      break;

    case "DELETE":
      return "Delete"
      break;

    case "DELIVERY_ATTEMPT":
      return "Delivery attempt"

    case "DELIVER_TO_CLIENT":
      return "Deliver to client"

    case "DELIVER_TO_WAREHOUSE":
      return "Deliver to warehouse"

    case "EDIT":
      return "Edit"

    case "NO_OPERATION":
      return "No operation"

    case "PAY_PARCEL":
      return "Pay parcel"

    default:
      return ""      
    }
  }

  doOperation(operation: IOperation,parcelId: number){        
    switch(operation.operationType.toString()){
    case "PICKUP":
      this.parcelPickUp(parcelId).subscribe(()=>{
        alert("Success");
      },error=>{
        alert(error.error.message);
      });
    break;

    case "PAY_FEE":
    this.putPayFee(parcelId).subscribe(()=>{
      alert("Success");
    },error=>{
      alert(error.error.message);
    });
    break;

    case "ASSIGN_TO_COURIER":
      // this.assigneToCourier(parcelId,courierId).subscribe(()=>{
      //   alert("Success");
      // },error=>{
      //   alert(error.error.message);
      // });
      break;

    case "DELETE":
      this.deleteObserveParcel(parcelId).subscribe(()=>{
        alert("Success");
      },error=>{
        alert(error.error.message);
      });
      break;

    case "DELIVERY_ATTEMPT":
      this.postAttempts(parcelId).subscribe(()=>{
        alert("Success");
      },error=>{
        alert(error.error.message);
      });
      break;

    case "DELIVER_TO_CLIENT":
      this.postDeliverToClient(parcelId).subscribe(()=>{
        alert("Success");
      },error=>{
        alert(error.error.message);
      });
      break;

    case "DELIVER_TO_WAREHOUSE":
      this.deliveryToWarehouse(parcelId,operation).subscribe(()=>{
        alert("Success");
      },error=>{
        alert(error.error.message);
      });
    break;

    case "EDIT":
      break;
    case "NO_OPERATION":
      break;

    case "PAY_PARCEL":
      this.putPayParcel(parcelId).subscribe(()=>{
        alert("Success");
      },error=>{
        alert(error.error.message);
      });
      break;
    default:
    }
  }

  deliveryToWarehouse(parcelId:number, operation: IOperation): Observable<void>{
    return this.http.post<void>(this.localUrl + `${parcelId}/deliver-to-warehouse`,{warehouseId: operation.warehouseId, warehouseType: operation.warehouseType});
  }

  assigneToCourier(parcelId:number,courierId: string): Observable<void>{
   return this.http.post<void>(this.localUrl+ `/${parcelId}/assign`,{courierId: courierId});
  }

  getGlobalWarehouseParcels(warehouseId: number): Observable<IWarehouseParcel>{
    return this.http.get<IWarehouseParcel>(`https://localhost:8080/api/warehouse/global/${warehouseId}/parcels`)
  }

  getLocalWarehouseParcels(warehouseId: number): Observable<IWarehouseParcel>{
    return this.http.get<IWarehouseParcel>(`https://localhost:8080/api/warehouse/local/${warehouseId}/parcels`)
  }

  getParcelsForCourier(): Observable<ICourierParcels>{
    return this.http.get<ICourierParcels>("https://localhost:8080/api/courier/parcels");
  }

  getParcelsForCourierById(courierId:string): Observable<ICourierParcels>{
    return this.http.get<ICourierParcels>(`https://localhost:8080/api/courier/parcels/${courierId}`);
  }

  observeParcel(id: number): Observable<void>{
    return this.http.post<void>(this.localUrl + `/${id}/observe`,null);
  }

  deleteObserveParcel(id: number): Observable<void>{
    return this.http.delete<void>(this.localUrl + `/${id}/observe`);
  }

  sendParcel(parcelRequest: IParcelSendRequest): Observable<IParcelSendRequest>{
    return this.http.post<IParcelSendRequest>(this.localUrl, parcelRequest);
  }

  getDataById(parcelId:string): Observable<IParcelBrief>{
    return this.http.get<IParcelBrief>(this.localUrl+"/"+parcelId);
  }

  getDataDetailById(parcelId:string): Observable<IParcelDetail>{
    return this.http.get<IParcelDetail>(this.localUrl+"/"+parcelId + "/detail");
  }


  getStateById(parcelId:string): Observable<IParcelState[]>{
    return this.http.get<IParcelState[]>(this.localUrl+"/"+parcelId+"/states");
  }

  getParcelAttempts(parcelId: string): Observable<IParcelAttempt[]>{
    return this.http.get<IParcelAttempt[]>(this.localUrl+"/"+parcelId+"/delivery-attempt");
  }

  postMoveDate(parcelId: string, parcelMoveDateRequest: IParcelMoveDateRequest): Observable<IParcelMoveDateRequest>{
    return this.http.post<IParcelMoveDateRequest>(this.localUrl + "/" + parcelId + "/move-date", parcelMoveDateRequest);
  }

  putPayParcel(parcelId: number): Observable<IParcelPayRequest>{
    return this.http.put<IParcelPayRequest>(this.localUrl+"/"+parcelId + "/pay",{paid: true});
  }

  putPayFee(parcelId: number): Observable<IParcelPayRequest>{
    return this.http.put<IParcelPayRequest>(this.localUrl+"/"+parcelId + "/pay-fee",{isPaid: true});
  }

 postAttempts(parcelId: number): Observable<IParcelAttempt>{
   return this.http.post<IParcelAttempt>(this.localUrl + "/" + parcelId + "/delivery-attempt",null);
  }

  postDeliverToClient(parcelId: number): Observable<void>{
    return this.http.post<void>(this.localUrl+ "/" + parcelId + "/deliver-to-client",null)
  }

  parcelPickUp(parcelId: number): Observable<void>{
    return this.http.post<void>(this.localUrl + `/${parcelId}/pick-up`,null);
  }

}
