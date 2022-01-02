import { IRegisterLogistician } from './../interface/user/reguisterlogistician';
import { IRegisterCourier } from './../interface/user/registercourier';
import { IRegisterBusinessClientRequest } from './../interface/user/registerbusinessclientrequest';
import { IRegisterClientRequest } from './../interface/user/registerclientrequest';
import { IErrorResponse } from './../interface/errorresponse';
import { IUser } from './../interface/user/user';
import { IUserLoginRequest } from '../interface/user/userloginrequest';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  localUrl = "https://localhost:8080/api/user/"

  currentUser!: IUser

  constructor(private http:HttpClient) {}

  loginUser(userLoginRequest: IUserLoginRequest){
    this.http.post(this.localUrl+"login",userLoginRequest).subscribe(() =>{
      this.getUser()
      console.log(this.currentUser);

    }, (error: IErrorResponse) =>{
      alert(error.message)
    })
    
  }

  registerClient(clientRequest: IRegisterClientRequest){
    this.http.post(this.localUrl + "/register/client",clientRequest).subscribe(()=>{},
    (error: IErrorResponse) => {
      alert(error.message)
    })
  }

  registerBusinessClient(businessClientRequest: IRegisterBusinessClientRequest){
    this.http.post(this.localUrl + "/register/business-client",businessClientRequest).subscribe(()=>{},
    (error: IErrorResponse) => {
      alert(error.message)
    })
  }

  registerCourier(courierRequest: IRegisterCourier){
    this.http.post(this.localUrl + "/register/courier",courierRequest).subscribe(()=>{},
    (error: IErrorResponse) => {
      alert(error.message)
    })
  }

  registerlogistician(logisticianRequest: IRegisterLogistician){
    this.http.post(this.localUrl + "/register/logistician",logisticianRequest).subscribe(()=>{},
    (error: IErrorResponse) => {
      alert(error.message)
    })
  }

  getUser(){
  this.http.get<IUser>(this.localUrl + "me").subscribe((data:IUser) =>{
    console.log("from service")
    console.log(data);
    
    this.currentUser = data
   })
  }

  getCurrentUser():string{
    return "client";
  }

}
