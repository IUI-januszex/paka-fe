import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IPostalCode } from '../interface/warehouse/postalcode';

@Injectable({
  providedIn: 'root'
})
export class PostalCodeService {

  localUrl = "https://localhost:8080/api/warehouse/postal-rage";


  constructor(private http:HttpClient) {}

  getData(): Observable<IPostalCode[]>{
    return this.http.get<IPostalCode[]>(this.localUrl)
  }

  putDataEdit(postalcode: IPostalCode): Observable<IPostalCode>{
    return this.http.put<IPostalCode>(this.localUrl + `/${postalcode.idRangePostalCode}`,postalcode)
  }

  postData(postalcode:IPostalCode): Observable<IPostalCode>{
    console.log(postalcode);
    return this.http.post<IPostalCode>(this.localUrl,postalcode)
  }

  deleteData(id: number){
    return this.http.delete(this.localUrl +`/${id}`)
  }
}
