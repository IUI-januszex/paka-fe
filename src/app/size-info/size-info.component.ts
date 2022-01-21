import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IParcelType } from '../interface/parcel/parceltype';
import { ParcelTypeService } from '../services/parcel-type.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'size-info',
  templateUrl: './size-info.component.html',
  styleUrls: ['./size-info.component.scss']
})
export class SizeInfoComponent implements OnInit {

  data: Array<IParcelType>
  
  constructor(private parcelTypeService:ParcelTypeService,
    private toastService: ToastService) { 
    this.data = new Array<IParcelType>()
  }

  ngOnInit(): void {
    this.getPareclType()
  }

  getPareclType(){
    this.parcelTypeService.getData().subscribe((data: IParcelType[])=>{
      this.data = data;
    },error =>{
      this.toastService.showError(error);
    })
  }

  foo(){
    
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }




}
