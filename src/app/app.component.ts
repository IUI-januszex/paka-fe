import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'paka-fe';
  user = 'client';

  userType: string = '';
  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(private modalService: NgbModal, private userService: UserService, private router: Router) {
    this.userService.isAny().subscribe((result)=>{
      this.isLoggedIn = result;
    })

    this.userService.getUserType().subscribe(result=>{
      this.userType = result;
    })
    
    this.userService.getUser().subscribe(result =>{
      this.userName = result.userName
    })
    
  }
  
  ngOnInit(): void {

  }

  logout(){
    this.userService.logOut().subscribe(()=>{
      this.router.navigate([""]);
      window.location.reload();
    },error =>{
     alert(error.error.message)
   });

  }



  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});    
  }
}
