import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourierParcels } from 'src/app/interface/parcel/courierparcels';
import { IParcelDetail } from 'src/app/interface/parcel/parceldetail';
import { ParcelService } from 'src/app/services/parcel.service';

@Component({
  selector: 'courier-parcels',
  templateUrl: './courier-parcels.component.html',
  styleUrls: ['./courier-parcels.component.scss']
})
export class CourierParcelsComponent implements OnInit {

  courierId: string;

  isAssigned: boolean;

  data: ICourierParcels | null = null
  assignedParcels: IParcelDetail[] | null = null
  pickedUpParcels: IParcelDetail[] | null = null
  pageAssigned: number = 1
  pagePickedUp: number = 1

  constructor(private route: ActivatedRoute, private parcelService: ParcelService, private toastService: ToastService) { 
    this.courierId = this.route.snapshot.params.courierId;
    this.isAssigned = true;
  }

  ngOnInit(): void {
    this.getData()
  }

  changeSite(bool: boolean){
    this.isAssigned = bool;
  }

  getData(){
    this.parcelService.getParcelsForCourierById(this.courierId).subscribe((data: ICourierParcels)=>{
      this.pickedUpParcels = data.pickedUpParcels;
      this.assignedParcels = data.assignedParcels;
    },error=>{
      this.toastService.showError(error)
    })
  }

}
