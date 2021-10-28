import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder:FormBuilder) {
    this.registerForm = this.formBuilder.group({
      email: formBuilder.control(''),
      password: formBuilder.control('')
    })
   }

   onSubmit(){
     
   }

  ngOnInit(): void {
  }

}
