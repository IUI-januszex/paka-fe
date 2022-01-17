import { IRegisterClientRequest } from './../../interface/user/registerclientrequest';
import { UserService } from './../../services/user.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.scss']
})
export class ClientRegistrationComponent implements OnInit {

  registrationForm: FormGroup
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService:UserService) {
    this.registrationForm = this.formBuilder.group({
      userName: ['',Validators.required],
      password: ['',Validators.required],
      name: ['',Validators.required],
      surname: ['',Validators.required],
      email: ['',Validators.required],
      phoneNumber: ['',Validators.required]
    })
   }

   onSubmit(registerRequest: IRegisterClientRequest){
    this.submitted = true;
    if(!this.registrationForm.valid){
      return
    }else{
    this.userService.registerClient(registerRequest)
   }
  }

   get ctls() {
    return this.registrationForm.controls;
  }
  ngOnInit(): void {
  }

}
