import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'paka-fe';
  user = 'client';

  constructor(private modalService: NgbModal) {}
  
  ngOnInit(): void {

  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});    
  }
}
