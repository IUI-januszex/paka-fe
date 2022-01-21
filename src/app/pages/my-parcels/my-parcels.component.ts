import { ToastService } from 'src/app/services/toast.service';
import { IParcelState } from './../../interface/parcel/parcelstate';
import { ParcelTypeService } from 'src/app/services/parcel-type.service';
import { ParcelService } from './../../services/parcel.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUserParcel } from './../../interface/parcel/userparcels';
import { IParcelBrief } from './../../interface/parcel/parcelbrief';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-parcels',
  templateUrl: './my-parcels.component.html',
  styleUrls: ['./my-parcels.component.scss']
})
export class MyParcelsComponent implements OnInit {

  pageTracked: number = 1
  pageSend: number = 1
  observedParcels: IParcelBrief[] = [];
  sendedParcels: IParcelBrief[] = [];
  tracked = [{id:"1",sendDate: "2022-01-10",state: "AT_SENDER"},
  {id:"2",sendDate: "2022-01-23",state: "AT_SENDER"},
  {id:"3",sendDate: "2022-01-05",state: "AT_SENDER"}]

  send = [{id:"1",sendDate: "2022-01-10",state: "AT_SENDER"},
  {id:"2",sendDate: "2022-01-23",state: "AT_SENDER"},
  {id:"2",sendDate: "2021-11-10",state: "AT_SENDER"}]


  isSended:boolean = true;

  parcelForm: FormGroup

  changeSite(bool: boolean){
    this.isSended = bool;
  }

  constructor(private toastService:ToastService,private parcelStateService:ParcelTypeService, private userService: UserService,private formBuilder: FormBuilder,private parcelService:ParcelService) {
    this.parcelForm = formBuilder.group({
      parcelId: formBuilder.control('')
    })
    this.getUserParcels();
   }

  ngOnInit(): void {
  }

  observeParcel(parcelId: number){   
    this.parcelService.observeParcel(parcelId).subscribe(()=>{
      this.getUserParcels();
    },error=>{
      this.toastService.showError(error);
    })
  }

  deleteObserveParcel(parcelId: number){
    this.parcelService.deleteObserveParcel(parcelId).subscribe(()=>{
      this.getUserParcels();
    },error=>{
      this.toastService.showError(error);
    })
  }

  getUserParcels(){
    this.userService.getUserParcels().subscribe((data: IUserParcel)=>{      
      this.observedParcels = data.observedParcels;
      this.sendedParcels = data.sentParcels
    })
  }

  getStatus(status: IParcelState){
    return this.parcelStateService.getParcelState(status);
  }

}
