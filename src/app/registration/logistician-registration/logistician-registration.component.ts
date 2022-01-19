import { IRegisterLogistician } from './../../interface/user/reguisterlogistician';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'logistician-registration',
  templateUrl: './logistician-registration.component.html',
  styleUrls: ['./logistician-registration.component.scss']
})
export class LogisticianRegistrationComponent implements OnInit {

  registrationForm: FormGroup

  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService:UserService) {
    this.registrationForm = this.formBuilder.group({
      userName: ['',Validators.required],
      password: ['',Validators.required],
      name: ['',Validators.required],
      surname: ['',Validators.required],
      email: ['', [Validators.required,Validators.email]],
      phoneNumber: ['',Validators.required],
      salary: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      warehouseId: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      warehouseType: ['',Validators.required]
    })
   }

   onSubmit(registerRequest: IRegisterLogistician){
    this.submitted = true;
    if(!this.registrationForm.valid){
      return
    }else{
    this.userService.registerLogistician(registerRequest);
   }
  }

   get ctls() {
    return this.registrationForm.controls;
  }

  ngOnInit(): void {
  }


}
