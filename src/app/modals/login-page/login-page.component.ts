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

  errorMsg: string | null = null;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  public onSubmit(userRequest: IUserLoginRequest) {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return
    } else {
      this.userService.loginUser(userRequest).subscribe(() => {window.location.reload()},
      error => {
        this.errorMsg = error?.error?.message ? error.error.message : 'Unknown error, please contact the adminstartor';
        setTimeout(() => this.errorMsg = null, 2000);
      });
    }
  }

  ngOnInit(): void {
  }

  get ctls() {
    return this.loginForm.controls;
  }

}
