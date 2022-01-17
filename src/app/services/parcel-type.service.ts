import { IParcelStatus } from './../interface/parcel/parcelstete';
import { IParcelState } from './../interface/parcel/parcelstate';
import { IParcelTypeRequest } from './../interface/parcel/parceltyperequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParcelType } from '../interface/parcel/parceltype';

@Injectable({
  providedIn: 'root'
})
export class ParcelTypeService {

  localUrl = "https://localhost:8080/api/parcel-type";


  constructor(private http:HttpClient) {}

  getParcelState(parcelState:IParcelState){
    switch(parcelState.type.toString()){
      case "AT_SENDER":
        return "at sender";
      case "ASSIGNED_TO_COURIER":
        return "assigned to courier";
      case "AT_COURIER":
        return "at courier";
      case "DELIVERED":
        return "delivered";
      case "AT_WAREHOUSE":
        return "at warehouse";
      case "RETURNED":
        return "returned";
      default:
        return "";
    }

  }

  getData(): Observable<IParcelType[]>{
    return this.http.get<IParcelType[]>(this.localUrl+"/active");
  }

  getAllData(): Observable<IParcelType[]>{
    return this.http.get<IParcelType[]>(this.localUrl);
  }

  putData(parcelType: IParcelTypeRequest, id:number): Observable<IParcelTypeRequest>{
    return this.http.put<IParcelTypeRequest>(this.localUrl + `/${id}`,parcelType)
  }

  postData(parcelType: IParcelTypeRequest): Observable<IParcelTypeRequest>{
    return this.http.post<IParcelTypeRequest>(this.localUrl, parcelType)
  }

  deleteData(id:number){
    return this.http.delete(this.localUrl + `/${id}`)
  }

  putStatus(parcelType: IParcelStatus,id: number): Observable<IParcelStatus>{
    return this.http.put<IParcelStatus>(this.localUrl + `/${id}/state`,parcelType)
  }


}
