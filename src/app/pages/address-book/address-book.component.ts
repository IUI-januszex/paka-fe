import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {

  page: number = 1


  constructor() { }

  ngOnInit(): void {
  }

}
