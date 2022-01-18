import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'paka-fe';
  user = 'client';

  get userType(){
    return this.userService.getCurrentUser()?.userType;
  }

  get isLoggedIn(): boolean{
    return this.userService.getCurrentUser() != null;
  }

  get userName(): string{
    return this.userService.getCurrentUser()?.userName || '';
  };

  constructor(private modalService: NgbModal, private userService: UserService, private router: Router) {
   
  }
  
  ngOnInit(): void {

  }

  logout(){
    this.userService.logOut().subscribe(()=>{
      this.router.navigate(["/logout"]);
    },error =>{
     alert(error.error.message)
   });
  }

  getType(){
    return
  }


  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});    
  }
}
