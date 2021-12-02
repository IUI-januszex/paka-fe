import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGlobalWarehouse } from '../interface/warehouse/globalwarehouse';

@Injectable({
  providedIn: 'root'
})
export class GlobalWarehouseService {

  constructor(private http:HttpClient) {}

  getData(): Observable<IGlobalWarehouse[]>{
    return this.http.get<IGlobalWarehouse[]>("https://localhost:8080/api/warehouse/global")
  }
}
