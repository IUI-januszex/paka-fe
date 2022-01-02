import { IUserLoginRequest } from './../../interface/user/userloginrequest';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  
  loginForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private userService:UserService) {
    this.loginForm = this.formBuilder.group({
      userName: formBuilder.control(''),
      password: formBuilder.control('')
    })
   }

   public onSubmit(userRequest: IUserLoginRequest){
     console.log(userRequest);
    this.userService.loginUser(userRequest)
   }

  ngOnInit(): void {
  }

}
