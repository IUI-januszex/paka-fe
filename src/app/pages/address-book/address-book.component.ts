import { IAddressBookRequest } from './../../interface/address-book/addressbookrequest';
import { AddresBookService } from './../../services/addres-book.service';
import { Component, OnInit } from '@angular/core';
import { IAddressBook } from 'src/app/interface/address-book/addressbook';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {

  page: number = 1
  data: Array<IAddressBook>

  addressBookId: number | null = null;


  constructor(private modalService: NgbModal,
    private modal: NgbActiveModal, private addressBookService: AddresBookService) { 
      this.data = new Array<IAddressBook>();
    }

  open(content: any) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }


  getAddressBooks(){
    this.addressBookService.getData().subscribe((data: IAddressBook[])=>{
      this.data = data
    },error=>{
     alert(error.error.message); 
    });
  }

  deleteAddressBook(addresbook: IAddressBook){
    this.addressBookService.deleteData(addresbook.id).subscribe(()=>{
    this.getAddressBooks();
    },error => {
      alert(error.error.message);
    })
  }

  onAddressBookAdd(addres: IAddressBookRequest){
    this.modal.close();
    this.getAddressBooks();
  }

  onAddressBookGet(addres: IAddressBook){
    this.modal.close();
    console.log("Data:");
    console.log(addres);
  }

  ngOnInit(): void {
    this.getAddressBooks()
  }

}
