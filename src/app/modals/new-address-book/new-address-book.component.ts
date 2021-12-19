import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'new-address-book',
  templateUrl: './new-address-book.component.html',
  styleUrls: ['./new-address-book.component.scss']
})
export class NewAddressBookComponent implements OnInit {

  addressBook:  FormGroup;

  constructor(private formBuilder:FormBuilder) {
    this.addressBook = this.formBuilder.group({
      email: formBuilder.control(''),
      city: formBuilder.control(''),
      street: formBuilder.control(''),
      postalCode: formBuilder.control(''),
      buildingNumber: formBuilder.control(''),
      flatNoumer: formBuilder.control(''),
      phoneNumber: formBuilder.control('')
    })
   }

  ngOnInit(): void {
  }

}
