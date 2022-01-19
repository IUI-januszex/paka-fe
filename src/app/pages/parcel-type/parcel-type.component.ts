import { IParcelTypeRequest } from './../../interface/parcel/parceltyperequest';
import { IParcelStatus } from './../../interface/parcel/parcelstete';
import { IParcelState } from './../../interface/parcel/parcelstate';
import { ILocalWarehouse } from './../../interface/warehouse/localwarehouse';
import { ParcelTypeService } from './../../services/parcel-type.service';
import { Component, OnInit } from '@angular/core';
import { IParcelType } from 'src/app/interface/parcel/parceltype';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'parcel-type',
  templateUrl: './parcel-type.component.html',
  styleUrls: ['./parcel-type.component.scss']
})
export class ParcelTypeComponent implements OnInit {

  data: Array<IParcelType>
  parcelId:number |null = null;
  page: number = 1
  parcelType: IParcelType | null = null;

  constructor(private modalService: NgbModal,
    private modal: NgbActiveModal,
    private parcelTypeService: ParcelTypeService,
    private toastService: ToastService) { 
      this.data = new Array<IParcelType>();
    }

  open(content: any) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  getParcelsType(){
    this.parcelTypeService.getAllData().subscribe((data: IParcelType[])=>{
      data.sort((a,b) => a.id - b.id)
      this.data = data
    },error =>{
      alert(error.error.message)
    });
  }

  changeState(parcelType: IParcelType){
    var parcelState: IParcelStatus = {isActive: !parcelType.isActive}

    this.parcelTypeService.putStatus(parcelState,parcelType.id).subscribe(()=>{
      this.getParcelsType();
      this.toastService.showSuccess();
    },
    error=>{
      this.toastService.showError(error);
    })
  }

  deleteParcelType(id: number){
    this.parcelTypeService.deleteData(id).subscribe(()=>{
      this.modal.close();
      this.getParcelsType();
    },error=>{
      this.toastService.showError(error);
    });
  }

  ngOnInit(): void {
    this.getParcelsType()
  }

  onParcelAdd(parceltype: IParcelTypeRequest){
    this.modal.close();
    this.getParcelsType();
  }

  setParcel(parcel: IParcelType){
    this.parcelType = parcel;
  }

  onParcelEdit(parceltype: IParcelTypeRequest){
    this.modal.close();
    this.getParcelsType();
  }



}
