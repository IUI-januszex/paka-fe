import { map } from 'rxjs/operators';
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

  currentUser: IUser = {id: '1', userName: 'anonymus', email: 'anonymus@anonymus.com',isActive: 'true', userType: 2137}

  constructor(private http:HttpClient) {
    this.getUser().subscribe((result: IUser)=>{
      this.currentUser = result
    })

    console.log(" obecny uzytkownik " + this.currentUser);
  }

  loginUser(userLoginRequest: IUserLoginRequest){
    this.http.post(this.localUrl+"login",userLoginRequest).subscribe(() =>{
     }, (error:any) =>{
       console.log(error);
       
      alert(error.error.message)
    })
    
  }

  logOut(){
   this.http.post(this.localUrl + "logout",null).subscribe(()=>{
     console.log("logout");
     
   });
  }

  registerClient(clientRequest: IRegisterClientRequest){
    this.http.post(this.localUrl + "register/client",clientRequest).subscribe(()=>{},
    (error: IErrorResponse) => {
      alert(error.message)
    })
  }

  registerBusinessClient(businessClientRequest: IRegisterBusinessClientRequest){
    this.http.post(this.localUrl + "register/business-client",businessClientRequest).subscribe(()=>{},
    (error: IErrorResponse) => {
      alert(error.message)
    })
  }

  registerCourier(courierRequest: IRegisterCourier){
    this.http.post(this.localUrl + "register/courier",courierRequest).subscribe(()=>{},
    (error: IErrorResponse) => {
      alert(error.message)
    })
  }

  registerLogistician(logisticianRequest: IRegisterLogistician){
    this.http.post(this.localUrl + "register/logistician",logisticianRequest).subscribe(()=>{},
    (error: IErrorResponse) => {
      alert(error.message)
    })
  }

  getUser(): Observable<IUser>{
  return this.http.get<IUser>(this.localUrl + "me")
  }

  isAdmin(): Observable<boolean>{
    return this.getUser().pipe(map(user => user && user.userType == 0));
  }

  isCourier(): Observable<boolean>{
    return this.getUser().pipe(map(user => user && user.userType == 1));
  }

  isLogistician(): Observable<boolean>{
    return this.getUser().pipe(map(user => user && user.userType == 2));
  }

  isEmployee(): Observable<boolean>{
    return this.getUser().pipe(map(user => user && user.userType == 1 || user.userType == 2));
  }

  isClientIndividual(): Observable<boolean>{
    return this.getUser().pipe(map(user => user && user.userType == 3));
  }

  isClient(): Observable<boolean>{
    return this.getUser().pipe(map(user => user && user.userType == 3 || user.userType == 4));
  }

  isClientBusiness(): Observable<boolean>{
    return this.getUser().pipe(map(user => user && user.userType == 4));
  }

  isAny(): Observable<boolean>{
    return this.getUser().pipe(map(user=> user && user.userType !=-1));
  }



  getCurrentUser():string{
    return "client";
  }

}
