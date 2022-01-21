import { IRegisterClientRequest } from './../../interface/user/registerclientrequest';
import { UserService } from './../../services/user.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.scss']
})
export class ClientRegistrationComponent implements OnInit {

  registrationForm: FormGroup
  submitted: boolean = false;

  errorMessage: string = '';

  @ViewChild('errorMessageModal') errorMessageModal: ElementRef | null = null;

  constructor(private formBuilder: FormBuilder,
    private userService:UserService,
    private router: Router,
    private toastService: ToastService,
    private modalService: NgbModal) {
    this.registrationForm = this.formBuilder.group({
      userName: ['',Validators.required],
      password: ['',Validators.required],
      name: ['',Validators.required],
      surname: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['',Validators.required]
    })
  }

  onSubmit(registerRequest: IRegisterClientRequest) {
    this.submitted = true;
    if (!this.registrationForm.valid) {
      return;
    } else {
      this.userService.registerClient(registerRequest).subscribe(() => {
        if (this.userService.currentUser?.userType === 0) {
          this.toastService.showSuccess();
          this.router.navigate(['registration/users']);
        } else {
          this.toastService.showSuccess('Registeration completed, now wait for account activation!');
          this.router.navigate(['/']);
        }
      }, (error) => {
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
