import { IParcelDetail } from './../interface/parcel/parceldetail';
import { IParcelPayRequest } from './../interface/parcel/parcelpayrequest';
import { IParcelMoveDateRequest } from './../interface/parcel/parcelmovedaterequest';
import { IParcelBrief } from './../interface/parcel/parcelbrief';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParcelState } from '../interface/parcel/parcelstate';
import { IParcelAttempt } from '../interface/parcel/parcelattempt';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  localUrl = "https://localhost:8080/api/parcel";

  constructor(private http:HttpClient) {}

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
    return this.http.get<IParcelAttempt[]>(this.localUrl+"/"+parcelId+"/delivery-attempts");
  }

  postMoveDate(parcelId: string, parcelMoveDateRequest: IParcelMoveDateRequest): Observable<IParcelMoveDateRequest>{
    return this.http.post<IParcelMoveDateRequest>(this.localUrl + "/" + parcelId + "/move-date", parcelMoveDateRequest);
  }

  putPayParcel(parcelId: string, parcelPayRequest: IParcelPayRequest): Observable<IParcelPayRequest>{
    return this.http.put<IParcelPayRequest>(this.localUrl+"/"+parcelId + "/pay",parcelPayRequest);
  }

}
