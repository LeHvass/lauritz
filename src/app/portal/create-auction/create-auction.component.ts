import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.scss']
})
export class CreateAuctionComponent implements OnInit {
  productForm: FormGroup;
 

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startingPrice: ['', Validators.required],
      minimumBid: ['', Validators.required],
      endDate: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log("productForm ", this.productForm);
  }
}
