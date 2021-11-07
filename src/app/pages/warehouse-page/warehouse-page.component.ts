import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'warehouse-page',
  templateUrl: './warehouse-page.component.html',
  styleUrls: ['./warehouse-page.component.scss']
})
export class WarehousePageComponent implements OnInit {

  globalWarehouses:any = []


  constructor(private modalService: NgbModal,private httpClient:HttpClient) { }


  ngOnInit(): void {
    this.getGlobalWarehouses();
  }
  
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});    
  }

  getGlobalWarehouses(){
    this.httpClient.get<GlobalWarehouse>('http://127.0.0.1:8000/api/GlobalWarehouse').subscribe(
    response =>{
      console.log(response);
      this.globalWarehouses = response;
    }
    )
  }
}

export interface GlobalWarehouse{
  idGlobalWarehouse: number,
  city: string,
  street: string,
  number: number,
  postalCode: string,
  active:boolean
}
