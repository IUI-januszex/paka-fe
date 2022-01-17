import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder:FormBuilder) {
    this.registerForm = this.formBuilder.group({
      email: ['',Validators.required, Validators.email],
      username: ['',Validators.required],
      phone: ['',Validators.required],
      password: ['',Validators.required]
    })
   }

   onSubmit(){
     
   }

  ngOnInit(): void {
  }

}
