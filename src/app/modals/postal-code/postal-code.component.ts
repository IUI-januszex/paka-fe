import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPostalCode } from 'src/app/interface/warehouse/postalcode';
import { PostalCodeService } from 'src/app/services/postal-code.service';

@Component({
  selector: 'postal-code',
  templateUrl: './postal-code.component.html',
  styleUrls: ['./postal-code.component.scss']
})
export class PostalCodeComponent implements OnInit {

  data: Array<IPostalCode>

  @Input()
  warehouseId?: number | null;

  postalCodeForm: FormGroup

  constructor(private postalCodeService:PostalCodeService,private modalService: NgbModal,
    private modal: NgbActiveModal, private formBuilder: FormBuilder) { 
      this.data = new Array<IPostalCode>()      
      this.postalCodeForm = this.formBuilder.group({
        idRangePostalCode: formBuilder.control(''),
        idLocalWarehouse: formBuilder.control('')
      })
    }
  
    getPostalCodes(){      
      if(this.warehouseId)
      this.postalCodeService.getDataByLocalWarehouseId(this.warehouseId).subscribe((data: IPostalCode[]) => {
        this.data = data
      })
    }

    getPostalCode(postalCode: String){
      this.postalCodeService
    }

    deleteData(postalCode: IPostalCode){
      this.postalCodeService.deleteData(postalCode).subscribe(()=>{
        this.getPostalCodes()
      })
      
    }

    onSubmit(postalCode: IPostalCode){      
      if(this.warehouseId)
      postalCode.idLocalWarehouse = this.warehouseId

      this.postalCodeService.getDataById(postalCode.idRangePostalCode).subscribe(()=>{
        this.postalCodeService.putDataEdit(postalCode).subscribe(()=>{
          this.getPostalCodes()
        })
        
      },()=>{
        this.postalCodeService.postData(postalCode).subscribe(()=>{
          this.getPostalCodes()
        })
    
      })
    }

  ngOnInit(): void {
    this.getPostalCodes()
  }

}
