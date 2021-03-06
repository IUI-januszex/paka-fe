import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IParcelType } from 'src/app/interface/parcel/parceltype';
import { IParcelTypeRequest } from 'src/app/interface/parcel/parceltyperequest';
import { ParcelTypeService } from 'src/app/services/parcel-type.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'edit-parcel-type',
  templateUrl: './edit-parcel-type.component.html',
  styleUrls: ['./edit-parcel-type.component.scss']
})
export class EditParcelTypeComponent implements OnInit {

  @Output()
  succes = new EventEmitter<IParcelTypeRequest>();

  @Input()
  parcelData?: IParcelType | null;

  constructor(private formBuilder:FormBuilder,
     private parcelTypeService: ParcelTypeService,
     private toastService: ToastService) { 
    this.parcelForm = this. formBuilder.group({
      name: ['', Validators.required],
      description: ['',[Validators.required, Validators.min(0)]],
      price: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  parcelForm: FormGroup;


  submitted: boolean = false;

  get ctls() {
    return this.parcelForm.controls;
  }

  onSubmit(instance: IParcelTypeRequest){
    this.submitted = true;
    if(!this.parcelForm.valid){
      return
    }else{
      if(this.parcelData !=null){
      this.parcelTypeService.putData(instance,this.parcelData.id).subscribe((e)=>{
        this.succes.emit(e);
        this.toastService.showSuccess();
      },error =>{
        this.toastService.showError(error);
      }
      );
  }
}

}
}
