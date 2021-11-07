import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'delete-warehouse',
  templateUrl: './delete-warehouse.component.html',
  styleUrls: ['./delete-warehouse.component.scss']
})
export class DeleteWarehouseComponent implements OnInit {

  warehouses: any = ['local','global'];

  deleteForm: FormGroup;

  constructor(private formBuilder:FormBuilder) { 
     this.deleteForm = this.formBuilder.group({
      id: formBuilder.control(''),
      selected: formBuilder.control('')
    })

  }

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
