import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGlobalWarehouse } from '../interface/warehouse/globalwarehouse';
import { IGlobalWarehouseRequest } from '../interface/warehouse/globalwarehouserequest';

@Injectable({
  providedIn: 'root'
})
export class GlobalWarehouseService {

  constructor(private http:HttpClient) {}

  localUrl = "https://localhost:8080/api/warehouse/global";

  getData(): Observable<IGlobalWarehouse[]>{
    return this.http.get<IGlobalWarehouse[]>(this.localUrl)
  }

  getDataById(id: number): Observable<IGlobalWarehouse>{
    return this.http.get<IGlobalWarehouse>(this.localUrl + `/${id}`)
  }

  putData(localwarehouse: IGlobalWarehouse): Observable<IGlobalWarehouse>{
    return this.http.put<IGlobalWarehouse>(this.localUrl + `/${localwarehouse.idWarehouse}`,localwarehouse)
  }

  putDataEdit(localwarehouse: IGlobalWarehouseRequest,id: number): Observable<IGlobalWarehouse>{
    return this.http.put<IGlobalWarehouse>(this.localUrl + `/${id}`,localwarehouse)
  }

  postData(localwarehouse:IGlobalWarehouseRequest): Observable<IGlobalWarehouse>{
    return this.http.post<IGlobalWarehouse>(this.localUrl,localwarehouse)
  }

  deleteData(id: number){
    return this.http.delete(this.localUrl +`/${id}`)
  }
}
