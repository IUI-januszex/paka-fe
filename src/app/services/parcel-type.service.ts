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

  getData(): Observable<IParcelType[]>{
    this.http.get<IParcelType>()
  }


}
