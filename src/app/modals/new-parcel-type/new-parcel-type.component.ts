import { ParcelTypeService } from './../../services/parcel-type.service';
import { IParcelTypeRequest } from './../../interface/parcel/parceltyperequest';
import { IParcelType } from 'src/app/interface/parcel/parceltype';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter, Input,Output } from '@angular/core';

@Component({
  selector: 'new-parcel-type',
  templateUrl: './new-parcel-type.component.html',
  styleUrls: ['./new-parcel-type.component.scss']
})
export class NewParcelTypeComponent implements OnInit {

    @Output()
  succes = new EventEmitter<IParcelTypeRequest>();

  @Input()
  warehouseData?: IParcelTypeRequest | null;

  constructor(private formBuilder:FormBuilder, private parcelTypeService: ParcelTypeService) { 
    this.parcelForm = this. formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
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
      this.parcelTypeService.postData(instance).subscribe((e)=>{
        this.succes.emit(e);
      },error =>{
        alert(error.error.message);
      }
      )
  }

}

}
