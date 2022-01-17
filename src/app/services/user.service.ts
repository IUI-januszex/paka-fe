import { ILogisticianData } from './../interface/user/logisticianuser';
import { IUserStatus } from './../interface/user/userStatus';
import { IUserParcel } from './../interface/parcel/userparcels';
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

  currentUser: IUser = {id: '1', userName: 'anonymus', email: 'anonymus@anonymus.com',isActive: true, userType: 2137}

  constructor(private http:HttpClient) {
    this.getUser().subscribe((result: IUser)=>{
      this.currentUser = result
    })
  }

  getCourierList(warehouseType: string,warehouseId:number):Observable<ILogisticianData[]>{
    if(warehouseType=="LOCAL"){
    return this.http.get<ILogisticianData[]>(`https://localhost:8080/api/warehouse/local/${warehouseId}/courier`);
    }else{
      return this.http.get<ILogisticianData[]>(`https://localhost:8080/api/warehouse/global/${warehouseId}/courier`);
    }
  }

  getAllUsers():Observable<IUser[]>{
    return this.http.get<IUser[]>(this.localUrl);
  }

  changeUserStatus(userStatusRequest: IUserStatus,id: string): Observable<void>{
    return this.http.put<void>(this.localUrl + `activate/${id}`, userStatusRequest);
  }

  loginUser(userLoginRequest: IUserLoginRequest){
    this.http.post(this.localUrl+"login",userLoginRequest).subscribe(() =>{
     }, (error:any) =>{    
      alert(error.error.message)
    })
    
  }

  logOut(){
   return this.http.post(this.localUrl + "logout",null);
  }

  getUserParcels(): Observable<IUserParcel>{
    return this.http.get<IUserParcel>(this.localUrl + "me/parcels");
  }

  registerClient(clientRequest: IRegisterClientRequest){
    this.http.post(this.localUrl + "register/client",clientRequest).subscribe(()=>{
      alert("Registration was successful");
    },
    (error: IErrorResponse) => {
      alert(error.message)
    })
  }

  registerBusinessClient(businessClientRequest: IRegisterBusinessClientRequest){
    this.http.post(this.localUrl + "register/business-client",businessClientRequest).subscribe(()=>{
      alert("Registration was successful");
    },
    (error: IErrorResponse) => {
      alert(error.message)
    })
  }

  registerCourier(courierRequest: IRegisterCourier){
    this.http.post(this.localUrl + "register/courier",courierRequest).subscribe(()=>{
      alert("Registration was successful");
    },
    (error: IErrorResponse) => {
      alert(error.message)
    })
  }

  registerLogistician(logisticianRequest: IRegisterLogistician){
    this.http.post(this.localUrl + "register/logistician",logisticianRequest).subscribe(()=>{
      alert("Registration was successful");
    },
    (error: IErrorResponse) => {
      alert(error.message)
    })
  }

  getUser(): Observable<IUser>{
  return this.http.get<IUser>(this.localUrl + "me")
  }

  getLogistician(): Observable<ILogisticianData>{
    return this.http.get<ILogisticianData>(this.localUrl + "me")
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

  getUserType(): Observable<string>{
    return this.getUser().pipe(map((user: IUser) => {
      switch(user.userType){
        case 0:
          return "admin";
        case 1:
          return "courier"
        case 2:
            return "logist"
        case 3:
            return "client"
        case 4:
          return "business"
        default:
          return "anonim"
      }
    }))
  }


  getCurrentUser():string{
    return "client";
  }

}
