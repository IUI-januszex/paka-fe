import { IRegisterBusinessClientRequest } from './../../interface/user/registerbusinessclientrequest';
import { IRegisterLogistician } from './../../interface/user/reguisterlogistician';
import { UserService } from './../../services/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'business-client-registration',
  templateUrl: './business-client-registration.component.html',
  styleUrls: ['./business-client-registration.component.scss']
})
export class BusinessClientRegistrationComponent implements OnInit {

  registrationForm: FormGroup

  submitted: boolean = false;

  errorMessage = '';

  @ViewChild('errorMessageModal') errorMessageModal: ElementRef | null = null;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private router: Router) {
    this.registrationForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]],
      nip: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required]
    })
  }

  onSubmit(registerRequest: IRegisterBusinessClientRequest) {
    this.submitted = true;
    if (!this.registrationForm.valid) {
      return;
    } else {
      this.userService.registerBusinessClient(registerRequest).subscribe(() => {
        if (this.userService.currentUser?.userType === 0) {
          this.toastService.showSuccess();
          this.router.navigate(['registration/users']);
        } else {
          this.toastService.showSuccess('Registeration completed, now wait for account activation!');
          this.router.navigate(['/']);
        }
      }, (error) => {
        console.log(this.errorMessageModal);
        this.errorMessage = (error?.error?.message) ? error.error.message : 'Unknown error, please contact the administator';
        this.modalService.open(this.errorMessageModal);
      });
    }
  }

  get ctls() {
    return this.registrationForm.controls;
  }

  ngOnInit(): void {
  }

}
