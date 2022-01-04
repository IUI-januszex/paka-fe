import { IRegisterBusinessClientRequest } from './../../interface/user/registerbusinessclientrequest';
import { IRegisterLogistician } from './../../interface/user/reguisterlogistician';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'business-client-registration',
  templateUrl: './business-client-registration.component.html',
  styleUrls: ['./business-client-registration.component.scss']
})
export class BusinessClientRegistrationComponent implements OnInit {

  registrationForm: FormGroup

  constructor(private formBuilder: FormBuilder, private userService:UserService) {
    this.registrationForm = this.formBuilder.group({
      userName: formBuilder.control(''),
      password: formBuilder.control(''),
      nip: formBuilder.control(''),
      companyName: formBuilder.control(''),
      email: formBuilder.control(''),
      phoneNumber: formBuilder.control('')
    })
   }

   onSubmit(registerRequest: IRegisterBusinessClientRequest){
    this.userService.registerBusinessClient(registerRequest)
   }

  ngOnInit(): void {
  }

}
