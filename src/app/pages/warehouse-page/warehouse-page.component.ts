import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'warehouse-page',
  templateUrl: './warehouse-page.component.html',
  styleUrls: ['./warehouse-page.component.scss']
})
export class WarehousePageComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});    
  }
}
