import { UserService } from './../../services/user.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ILogisticianData } from 'src/app/interface/user/logisticianuser';
import { Router } from '@angular/router';

@Component({
  selector: 'courier-list',
  templateUrl: './courier-list.component.html',
  styleUrls: ['./courier-list.component.scss']
})
export class CourierListComponent implements OnInit {


  @Output()
  succes = new EventEmitter<ILogisticianData>();

  logisticianData: ILogisticianData | null = null;

  courierList: ILogisticianData[] = [];

  page: number = 1;

  constructor(private userService: UserService,private router:Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userService.getLogistician().subscribe((data: ILogisticianData) =>{
      this.logisticianData = data;  
      this.getCourierList();    
    },error =>{
      alert(error.error.message);
    });
  }

  getCourierList(){
    if(this.logisticianData){
        this.userService.getCourierList(this.logisticianData.warehouseType, this.logisticianData.warehouseId).subscribe((data: ILogisticianData[])=>{
          this.courierList = data
        },error=>{
          alert(error.error.message);
        })
    }
}

onSubmit(instance: ILogisticianData){
  this.succes.emit(instance);
}

onSubmitInfo(courier: ILogisticianData){
  this.router.navigate([]).then(()=>{
    window.open('/courier-parcels/' + courier.id)
  })
}

}
