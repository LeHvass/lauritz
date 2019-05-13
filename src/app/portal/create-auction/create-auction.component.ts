import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Gender } from 'src/app/entities/user';
import { TempDataService } from 'src/app/services/temp-data.service';
import { Product } from 'src/app/entities/product';
import { Router } from '@angular/router';
import { ProductActions } from '../product.actions';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.scss']
})
export class CreateAuctionComponent implements OnInit {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private temp: TempDataService, 
    private router: Router, private productActions: ProductActions) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['',Validators.required],
      startingPrice: ['',Validators.required],
      minimumBid: ['',Validators.required],
      endDate: ['',Validators.required],
      location: ['',Validators.required],
    })
  }

  onSubmit() {
    let product = this.productForm.value as Product;

    this.productActions.createNewProduct(product);
    // this.temp.addProduct(product);

    console.log(product);
    console.log("productForm ", this.productForm);

    this.router.navigate(['/portal/display-auctions']);
  }
}
