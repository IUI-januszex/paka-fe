import { AddresBookService } from './../../services/addres-book.service';
import { IAddressBookRequest } from './../../interface/address-book/addressbookrequest';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'new-address-book',
  templateUrl: './new-address-book.component.html',
  styleUrls: ['./new-address-book.component.scss']
})
export class NewAddressBookComponent implements OnInit {

  addressBookForm: FormGroup;

  @Output()
  succes = new EventEmitter<IAddressBookRequest>();

  @Input()
  addressBookData?: IAddressBookRequest | null;

  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private addressBookService: AddresBookService,
    private toastService: ToastService) {
    this.addressBookForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern("^([0-9]{2})-([0-9]{3})")]],
      buildingNumber: ['', [Validators.required]],
      flatNumber: ['', [Validators.required]],
      personalities: ['', [Validators.required]],
      addressName: ['', [Validators.required]]
    })
  }

  get ctls() {
    return this.addressBookForm.controls;
  }

  ngOnInit(): void {
  }

  onSubmit(addresBook: IAddressBookRequest) {
    this.submitted = true;
    console.log(addresBook);
    if (!this.addressBookForm.valid) {
      return;
    } else {
      console.log(addresBook);
      this.addressBookService.postData(addresBook).subscribe((e) => {
        this.toastService.showSuccess();
        this.succes.emit(e);
      }, error => {
        this.toastService.showError(error);
      });
    }

  }

}
