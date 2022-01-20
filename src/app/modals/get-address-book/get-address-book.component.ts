import { ToastService } from 'src/app/services/toast.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IAddressBook } from 'src/app/interface/address-book/addressbook';
import { IAddressBookRequest } from 'src/app/interface/address-book/addressbookrequest';
import { AddresBookService } from 'src/app/services/addres-book.service';

@Component({
  selector: 'get-address-book',
  templateUrl: './get-address-book.component.html',
  styleUrls: ['./get-address-book.component.scss']
})
export class GetAddressBookComponent implements OnInit {

  @Output()
  succes = new EventEmitter<IAddressBook>();

  data: Array<IAddressBook>

  page: number = 1

  @Input()
  addressBookData?: IAddressBookRequest | null;

  constructor(private toastService: ToastService,private addressBookService: AddresBookService,private modalService: NgbModal,
    private modal: NgbActiveModal) {
      this.data = new Array<IAddressBook>();
     }

  ngOnInit(): void {
    this.getAddressBooks();
  }

  onSubmit(instance: IAddressBook){
    this.succes.emit(instance);
  }

  getAddressBooks(){
    this.addressBookService.getData().subscribe((data: IAddressBook[])=>{
      this.data = data;
    },error=>{
      this.toastService.showError(error);
    });
  }

}
