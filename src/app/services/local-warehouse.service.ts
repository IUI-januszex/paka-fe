import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ILocalWarehouse } from '../interface/warehouse/localwarehouse';
import { ILocalWarehouseRequest } from '../interface/warehouse/localwarehouserequest';

@Injectable({
  providedIn: 'root'
})
export class LocalWarehouseService {

  localUrl = "https://localhost:8080/api/warehouse/local";

  constructor(private http:HttpClient) {}

  getData(): Observable<ILocalWarehouse[]>{
    return this.http.get<ILocalWarehouse[]>(this.localUrl)
  }

  putData(localwarehouse: ILocalWarehouse): Observable<ILocalWarehouse>{
    return this.http.put<ILocalWarehouse>(this.localUrl + `/${localwarehouse.idWarehouse}`,localwarehouse)
  }

  postData(localwarehouse:ILocalWarehouseRequest): Observable<ILocalWarehouse>{
    console.log(localwarehouse);
    return this.http.post<ILocalWarehouse>(this.localUrl,localwarehouse)
  }

  deleteData(id: number){
    return this.http.delete(this.localUrl +`/${id}`)
  }
}
