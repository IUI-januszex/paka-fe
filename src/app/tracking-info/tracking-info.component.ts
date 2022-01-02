import { IParcelPayRequest } from './../interface/parcel/parcelpayrequest';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IParcelState } from './../interface/parcel/parcelstate';
import { IParcelBrief } from './../interface/parcel/parcelbrief';
import { ParcelService } from './../services/parcel.service';
import { UserService } from '../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IParcelAttempt } from '../interface/parcel/parcelattempt';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'tracking-info',
  templateUrl: './tracking-info.component.html',
  styleUrls: ['./tracking-info.component.scss']
})
export class TrackingInfoComponent implements OnInit {

  changeDateForm: FormGroup

  data!: IParcelBrief
  states!: IParcelState[]
  lastState!: IParcelState
  attempts!: IParcelAttempt[]
  parcelId:string
  user: string;
  constructor(private formBuilder:FormBuilder, private userService: UserService,private parcelService: ParcelService, private route: ActivatedRoute,private modalService: NgbModal, private modal: NgbActiveModal) { 
    this.user = userService.getCurrentUser();
    this.parcelId = this.route.snapshot.params.parcelId
    this.changeDateForm = this.formBuilder.group({
      pin: formBuilder.control(''),
      date: formBuilder.control('')
    })
  }

  ngOnInit(): void {
    this.getData(this.parcelId)
    this.getState(this.parcelId)
  }

  onSubmitDate(){
    console.log(this.changeDateForm.value);
    this.parcelService.postMoveDate(this.parcelId,this.changeDateForm.value).subscribe()
  }

  getData(parcelId:string){
    this.parcelService.getDataById(parcelId).subscribe(data =>{
      this.data = data      
      console.log(this.data);
    })
  }

  getState(parcelId:string){
    this.parcelService.getStateById(parcelId).subscribe(data =>{
      this.states = data      
      console.log(this.states);
      this.lastState = this.states[this.states.length -1]
    })
  }

  getAttempts(parcelId:string){
    this.parcelService.getParcelAttempts(parcelId).subscribe(data =>{
      this.attempts = data
    })
  }

  putPaid(){
   const payRequest: IParcelPayRequest = {paid: true}
    this.parcelService.putPayParcel(this.parcelId,payRequest).subscribe()
  }

  open(content: any) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

}
