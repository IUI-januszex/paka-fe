import { IRegisterCourier } from './../../interface/user/registercourier';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'courier-registration',
  templateUrl: './courier-registration.component.html',
  styleUrls: ['./courier-registration.component.scss']
})
export class CourierRegistrationComponent implements OnInit {

  registrationForm: FormGroup

  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService:UserService) {
    this.registrationForm = this.formBuilder.group({
      userName: ['',Validators.required],
      password: ['',Validators.required],
      name: ['',Validators.required],
      surname: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      phoneNumber: ['',Validators.required],
      salary: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      warehouseId: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      warehouseType: ['',Validators.required]
    })
   }

   onSubmit(registerRequest: IRegisterCourier){
    this.submitted = true;
    if(!this.registrationForm.valid){
      return
    }else{
    this.userService.registerCourier(registerRequest);
   }
  }

   get ctls() {
    return this.registrationForm.controls;
  }

  ngOnInit(): void {
  }

}
