import { ToastService } from 'src/app/services/toast.service';
import { ParcelService } from './../../services/parcel.service';
import { IParcelSendRequest } from './../../interface/parcel/parcelsendrequest';
import { IAddressBook } from './../../interface/address-book/addressbook';
import { IParcelType } from './../../interface/parcel/parceltype';
import { ParcelTypeService } from './../../services/parcel-type.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'send-parcel',
  templateUrl: './send-parcel.component.html',
  styleUrls: ['./send-parcel.component.scss']
})
export class SendParcelComponent implements OnInit {

  activeParcelTypes: IParcelType[] | null = null;

  errorMessage: string = '';

  @ViewChild('errorMessageModal') errorMessageModal: ElementRef | null = null;

  reciverAddress: IAddressBook = {
    addressName: "",
    buildingNumber: "",
    buisnessClientId: "",
    city: "",
    clientId: "",
    email: "",
    flatNumber: "",
    id: 0,
    personalities: "",
    postalCode: "",
    street: ""
  }

  senderAddress: IAddressBook = {
    addressName: "",
    buildingNumber: "",
    buisnessClientId: "",
    city: "",
    clientId: "",
    email: "",
    flatNumber: "",
    id: 0,
    personalities: "",
    postalCode: "",
    street: ""
  }

  sendParcelForm: FormGroup

  submitted: boolean = false;

  constructor(private toastService: ToastService, private modalService: NgbModal, private parcelService: ParcelService, private router: Router,
    private modal: NgbActiveModal, private formBuilder: FormBuilder, private parcelTypeService: ParcelTypeService) {
    this.sendParcelForm = this.formBuilder.group({
      deliveryAddress: this.formBuilder.group({
        buildingNumber: ['', Validators.required],
        city: ['', Validators.required],
        flatNumber: ['', Validators.required],
        postalCode: ['', [Validators.required, Validators.pattern("^([0-9]{2})-([0-9]{3})")]],
        street: ['', Validators.required]
      }),
      parcelType: ['', Validators.required],
      price: ['', Validators.required],
      receiverDetails: ['', Validators.required],
      receiverEmailAddres: ['', Validators.required],
      receiverPhoneNumber: ['', Validators.required],
      senderAddress: this.formBuilder.group({
        buildingNumber: ['', Validators.required],
        city: ['', Validators.required],
        flatNumber: ['', Validators.required],
        postalCode: [, [Validators.required, Validators.pattern("^([0-9]{2})-([0-9]{3})")]],
        street: ['', Validators.required]
      }),
      senderDetails: ['', Validators.required],
      senderEmailAddress: ['', Validators.required],
      senderPhoneNumber: ['', Validators.required]
    });


  }

  deiliveryHasError(field: string | number, type: string | number = 'required'): boolean {
    const errors = this.sendParcelForm.get(['deliveryAddress', field])?.errors;
    if (!errors) {
      return false;
    }
    return errors[type];
  }

  senderHasError(field: string | number, type: string | number = 'required'): boolean {
    const errors = this.sendParcelForm.get(['senderAddress', field])?.errors;
    if (!errors) {
      return false;
    }
    return errors[type];
  }

  get ctls() {
    return this.sendParcelForm.controls;
  }

  getActiveParcelTypes() {
    this.parcelTypeService.getData().subscribe((data: IParcelType[]) => {
      this.activeParcelTypes = data
    }, error => {
      this.toastService.showError(error);
    })
  }

  ngOnInit(): void {
    this.getActiveParcelTypes()
  }

  onSubmit(parcelRequest: IParcelSendRequest) {
    this.submitted = true;
    if (!this.sendParcelForm.valid) {
      return;
    } else {
      this.parcelService.sendParcel(parcelRequest).subscribe(() => {
        this.toastService.showSuccess();
        this.router.navigate(['my-parcels']);
      }, error => {
        this.errorMessage = (error?.error?.message) ? error.error.message : 'Unknown error, please contact the administator';
        this.modalService.open(this.errorMessageModal);
      })
    }
  }

  sender(content: any) {
    this.modal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  onAddressBookGet(addres: IAddressBook) {
    this.modal.close();
  }

  onAddressBookGetReciver(addres: IAddressBook) {
    this.modal.close();
    this.reciverAddress = addres
    this.sendParcelForm.controls['receiverDetails'].setValue(this.reciverAddress.personalities);
    this.sendParcelForm.get(['deliveryAddress', 'city'])?.setValue(this.reciverAddress.city);
    this.sendParcelForm.get(['deliveryAddress', 'buildingNumber'])?.setValue(this.reciverAddress.buildingNumber);
    this.sendParcelForm.get(['deliveryAddress', 'flatNumber'])?.setValue(this.reciverAddress.flatNumber);
    this.sendParcelForm.get(['deliveryAddress', 'postalCode'])?.setValue(this.reciverAddress.postalCode);
    this.sendParcelForm.get(['deliveryAddress', 'street'])?.setValue(this.reciverAddress.street);
    this.sendParcelForm.controls['receiverEmailAddres'].setValue(this.reciverAddress.email);
  }
  onAddressBookGetSender(addres: IAddressBook) {
    this.modal.close();
    this.senderAddress = addres
    this.sendParcelForm.controls['senderDetails'].setValue(this.senderAddress.personalities);
    this.sendParcelForm.get(['senderAddress', 'city'])?.setValue(this.senderAddress.city);
    this.sendParcelForm.get(['senderAddress', 'buildingNumber'])?.setValue(this.senderAddress.buildingNumber);
    this.sendParcelForm.get(['senderAddress', 'flatNumber'])?.setValue(this.senderAddress.flatNumber);
    this.sendParcelForm.get(['senderAddress', 'postalCode'])?.setValue(this.senderAddress.postalCode);
    this.sendParcelForm.get(['senderAddress', 'street'])?.setValue(this.senderAddress.street);
    this.sendParcelForm.controls['senderEmailAddress'].setValue(this.senderAddress.email);
  }

}
