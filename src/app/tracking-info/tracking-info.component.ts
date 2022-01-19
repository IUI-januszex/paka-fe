import { ToastService } from './../services/toast.service';
import { IErrorResponse } from './../interface/errorresponse';
import { IParcelDetail } from './../interface/parcel/parceldetail';
import { IParcelPayRequest } from './../interface/parcel/parcelpayrequest';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IParcelState } from './../interface/parcel/parcelstate';
import { IParcelBrief } from './../interface/parcel/parcelbrief';
import { ParcelService } from './../services/parcel.service';
import { UserService } from '../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IParcelAttempt } from '../interface/parcel/parcelattempt';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BooleanLiteral } from 'typescript';
import { map } from 'rxjs/operators';
import { IParcelMoveDateRequest } from '../interface/parcel/parcelmovedaterequest';
import { OperationType } from '../interface/parcel/operationtype';
import { ParcelTypeService } from '../services/parcel-type.service';

@Component({
  selector: 'tracking-info',
  templateUrl: './tracking-info.component.html',
  styleUrls: ['./tracking-info.component.scss']
})
export class TrackingInfoComponent implements OnInit {

  changeDateForm: FormGroup

  counter: number = 0;

  noParcel:boolean = false;

  submitted: boolean = false;

  data!: any
  states!: IParcelState[]
  lastState!: IParcelState
  attempts!: IParcelAttempt[]
  parcelId:string

  showChangeDate: boolean = false;

  constructor(private toastService:ToastService ,private parcelTypeService: ParcelTypeService, private formBuilder:FormBuilder, private userService: UserService,private parcelService: ParcelService, private route: ActivatedRoute,private modalService: NgbModal, private modal: NgbActiveModal) { 
    this.parcelId = this.route.snapshot.params.parcelId
    this.changeDateForm = this.formBuilder.group({
      pin: ['',Validators.required],
      newDate: ['',Validators.required]
    })
  }

  get ctls() {
    return this.changeDateForm.controls;
  }

  ngOnInit(): void {
    this.getData(this.parcelId);
    this.getState(this.parcelId);
    this.getAttempts(this.parcelId);
    this.userService.isClient().subscribe((result)=>{
      this.showChangeDate = result;
    }, (error: any) =>{
      this.showChangeDate = error.status==403;
    })

  }

  onSubmitDate(parcelMoveDataRequest : IParcelMoveDateRequest){
    this.submitted = true;
    if (!this.changeDateForm.valid) {
      return;
    }else{
    this.parcelService.postMoveDate(this.parcelId,parcelMoveDataRequest).subscribe(()=>{
      this.modal.close();
      this.getData(this.parcelId);
    },error=>{
      this.toastService.showError(error);
    })
  }
  }

  getData(parcelId:string){
    this.userService.isEmployee().subscribe(result =>{
      if(result){
        this.parcelService.getDataDetailById(parcelId).subscribe((data: IParcelDetail) => {
          this.data = data;          
        },error =>{
          if(this.counter === 0){
            this.counter++;
            this.toastService.showError(error);
          }
          if(error.status==404){
            this.noParcel = true;
          }
        });
      }
      else{
        this.parcelService.getDataById(parcelId).subscribe(data => {
          this.data = data;
        },error =>{
          if(this.counter === 0){
            this.counter++;
            this.toastService.showError(error);
          }
          if(error.status==404){
            this.noParcel = true;
          }
         });
      }
    }, (error: any) => {
      if(error.status==403){
        this.parcelService.getDataById(parcelId).subscribe(data => {
          this.data = data;
        }, error =>{
          if(this.counter === 0){
            this.counter++;
            this.toastService.showError(error);
          }
          if(error.status==404){
            this.noParcel = true;
          }
        });
      }
    });

   //zamiast mapa integera observera i w ngifa zrobic podstawowe dla nie zalogowanego
  }

  getState(parcelId:string){
    this.parcelService.getStateById(parcelId).subscribe(data =>{
      this.states = data      
      console.log(this.states);
      this.lastState = this.states[this.states.length -1]
    }, error=>{
      if(this.counter === 0){
        this.counter++;
        this.toastService.showError(error);
      }
      if(error.status==404){
        this.noParcel = true;
      }
    })
  }

  getAttempts(parcelId:string){
    this.parcelService.getParcelAttempts(parcelId).subscribe(data =>{
      this.attempts = data
    }, error=>{
      if(this.counter === 0){
        this.counter++;
        this.toastService.showError(error)
      }
      if(error.status==404){
        this.noParcel = true;
      }
    })
  }

  getParcelState(parcelState: IParcelState): string{     
    return this.parcelTypeService.getParcelState(parcelState);  
   }


  open(content: any) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

}
