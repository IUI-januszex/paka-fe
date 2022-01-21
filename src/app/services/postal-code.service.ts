import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IPostalCode } from '../interface/warehouse/postalcode';

@Injectable({
  providedIn: 'root'
})
export class PostalCodeService {

  localUrl = "https://localhost:8080/api/warehouse/postal-rage";
  postalRageUrl = "https://localhost:8080/api/warehouse/local/";


  constructor(private http:HttpClient) {}

  getData(): Observable<IPostalCode[]>{
    return this.http.get<IPostalCode[]>(this.localUrl)
  }

  getDataById(postalCodeId:String): Observable<IPostalCode>{
    return  this.http.get<IPostalCode>(this.localUrl + `/${postalCodeId}`)
  }

  putDataEdit(postalcode: IPostalCode): Observable<IPostalCode>{
    return this.http.put<IPostalCode>(this.localUrl + `/${postalcode.idRangePostalCode}`,postalcode)
  }

  postData(postalcode:IPostalCode): Observable<IPostalCode>{
    return this.http.post<IPostalCode>(this.localUrl,postalcode)
  }

  getDataByLocalWarehouseId(id: number): Observable<IPostalCode[]>{
    return this.http.get<IPostalCode[]>(this.postalRageUrl+`${id}/postal-code`)
  }
 
  deleteData(postalcode:IPostalCode){
    return this.http.delete(this.localUrl + `/${postalcode.idRangePostalCode}`)
  }
}