import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILocalWarehouse } from '../interface/warehouse/localwarehouse';

@Injectable({
  providedIn: 'root'
})
export class LocalWarehouseService {

  constructor(private http:HttpClient) {}

  getData(): Observable<any>{
    return this.http.get<any>("localhost:8080/api/warehouse/local")
  }
}
