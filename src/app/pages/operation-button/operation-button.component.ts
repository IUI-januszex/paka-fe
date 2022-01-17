import { IOperation } from './../../interface/parcel/operation';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'operation-button',
  templateUrl: './operation-button.component.html',
  styleUrls: ['./operation-button.component.scss']
})
export class OperationButtonComponent implements OnInit {

@Input()
operations?: IOperation[]

  constructor() { }

  ngOnInit(): void {

  }

}
