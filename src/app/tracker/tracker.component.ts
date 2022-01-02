import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  parcelForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private router:Router) {
    this.parcelForm = this.formBuilder.group({
      parcelId: formBuilder.control('')
    })
   }

  ngOnInit(): void {
  
  }

  onSubmit(){
    console.log(this.parcelForm.value);
    this.router.navigate(['/tracking-info',this.parcelForm.value.parcelId])
  }


}
