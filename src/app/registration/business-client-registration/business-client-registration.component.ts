import { IRegisterBusinessClientRequest } from './../../interface/user/registerbusinessclientrequest';
import { IRegisterLogistician } from './../../interface/user/reguisterlogistician';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'business-client-registration',
  templateUrl: './business-client-registration.component.html',
  styleUrls: ['./business-client-registration.component.scss']
})
export class BusinessClientRegistrationComponent implements OnInit {

  registrationForm: FormGroup

  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService:UserService) {
    this.registrationForm = this.formBuilder.group({
      userName:  ['',Validators.required],
      password:  ['',Validators.required, Validators.pattern("^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}")],
      nip:  ['',Validators.required],
      companyName:  ['',Validators.required],
      email:  ['',Validators.required, Validators.email],
      phoneNumber:  ['',Validators.required]
    })
   }

   onSubmit(registerRequest: IRegisterBusinessClientRequest){
    this.submitted = true;
    if(!this.registrationForm.valid){
      return
    }else{
    this.userService.registerBusinessClient(registerRequest)
    }
   }

   get ctls() {
    return this.registrationForm.controls;
  }

  ngOnInit(): void {
  }

}
