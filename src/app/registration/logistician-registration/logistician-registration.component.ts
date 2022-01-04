import { IRegisterLogistician } from './../../interface/user/reguisterlogistician';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'logistician-registration',
  templateUrl: './logistician-registration.component.html',
  styleUrls: ['./logistician-registration.component.scss']
})
export class LogisticianRegistrationComponent implements OnInit {

  registrationForm: FormGroup

  constructor(private formBuilder: FormBuilder, private userService:UserService) {
    this.registrationForm = this.formBuilder.group({
      userName: formBuilder.control(''),
      password: formBuilder.control(''),
      name: formBuilder.control(''),
      surname: formBuilder.control(''),
      email: formBuilder.control(''),
      phoneNumber: formBuilder.control(''),
      salary: formBuilder.control(''),
      warehouseId: formBuilder.control(''),
      warehouseType: formBuilder.control('')
    })
   }

   onSubmit(registerRequest: IRegisterLogistician){
    this.userService.registerLogistician(registerRequest)
   }

  ngOnInit(): void {
  }

}
