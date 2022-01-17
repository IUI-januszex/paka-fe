import { IAddressBookRequest } from './../interface/address-book/addressbookrequest';
import { IAddressBook } from './../interface/address-book/addressbook';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddresBookService {

  localUrl = "https://localhost:8080/api/address-book";

  constructor(private http:HttpClient) { }

  getData(): Observable<IAddressBook[]>{
    return this.http.get<IAddressBook[]>(this.localUrl);
  }

  postData(request: IAddressBookRequest): Observable<IAddressBookRequest>{
    return this.http.post<IAddressBookRequest>(this.localUrl,request);
  }

  deleteData(id: number){
    return this.http.delete(this.localUrl + `/${id}`);
  }


}
