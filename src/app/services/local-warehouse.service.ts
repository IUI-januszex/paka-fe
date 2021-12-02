import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILocalWarehouse } from '../interface/warehouse/localwarehouse';

@Injectable({
  providedIn: 'root'
})
export class LocalWarehouseService {

  constructor(private http:HttpClient) {}

  getData(): Observable<ILocalWarehouse[]>{
    return this.http.get<ILocalWarehouse[]>("https://localhost:8080/api/warehouse/local")
  }
}
