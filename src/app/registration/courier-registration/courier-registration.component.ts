import { IRegisterCourier } from './../../interface/user/registercourier';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'courier-registration',
  templateUrl: './courier-registration.component.html',
  styleUrls: ['./courier-registration.component.scss']
})
export class CourierRegistrationComponent implements OnInit {

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

   onSubmit(registerRequest: IRegisterCourier){
    this.userService.registerCourier(registerRequest)
   }

  ngOnInit(): void {
  }

}
