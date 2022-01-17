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

  submitted: boolean = false;


  constructor(private formBuilder:FormBuilder, private userService:UserService) {
    this.loginForm = this.formBuilder.group({
      userName: ['',Validators.required],
      password: ['',Validators.required]
    })
   }

   public onSubmit(userRequest: IUserLoginRequest){
     this.submitted = true;
     if(!this.loginForm.valid){
       return
     }else{
    this.userService.loginUser(userRequest)
    window.location.reload();
     }
   }

  ngOnInit(): void {
  }

  get ctls() {
    return this.loginForm.controls;
  }

}
