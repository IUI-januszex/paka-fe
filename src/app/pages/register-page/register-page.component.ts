import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  constructor(private router: Router,
    private userService: UserService) {
   }

   onSubmit(){
     
   }

  ngOnInit(): void {
    if(this.userService.getCurrentUser()?.userType == 0 ){
      this.router.navigate(['registration/users']);
    }
  };

  get isAdmin(): boolean {
    return this.userService.getCurrentUser()?.userType === 0;
  }

}
