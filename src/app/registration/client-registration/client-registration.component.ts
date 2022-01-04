import { IRegisterClientRequest } from './../../interface/user/registerclientrequest';
import { UserService } from './../../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.scss']
})
export class ClientRegistrationComponent implements OnInit {

  registrationForm: FormGroup

  constructor(private formBuilder: FormBuilder, private userService:UserService) {
    this.registrationForm = this.formBuilder.group({
      userName: formBuilder.control(''),
      password: formBuilder.control(''),
      name: formBuilder.control(''),
      surname: formBuilder.control(''),
      email: formBuilder.control(''),
      phoneNumber: formBuilder.control('')
    })
   }

   onSubmit(registerRequest: IRegisterClientRequest){
    this.userService.registerClient(registerRequest)
   }

  ngOnInit(): void {
  }

}
