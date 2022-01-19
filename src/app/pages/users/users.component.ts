import { IUserStatus } from './../../interface/user/userStatus';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interface/user/user';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  page: number = 1;
  data: Array<IUser>;


  constructor(private userService: UserService) {
    this.data = new Array<IUser>();
   }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.userService.getAllUsers().subscribe((data: IUser[])=>{
      this.data = data
    }, error=>{
      alert(error.error.message);
    })
  }

  stateChange(data: IUser){
    var status: IUserStatus = {isActive: !data.isActive};
    this.userService.changeUserStatus(status,data.id).subscribe(()=>{
      this.getData();
    },error =>{
      alert(error.error.message)
    })
  }


  getUserType(type:number){
    switch(type){
      case 0:
        return "admin";
      case 1:
        return "courier"
      case 2:
          return "logist"
      case 3:
          return "client"
      case 4:
        return "business"
      default:
        return "anonim"
    }
  }

}
