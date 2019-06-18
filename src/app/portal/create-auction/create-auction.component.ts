import { ProductsApiService } from './../../services/products-api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TempDataService } from 'src/app/services/temp-data.service';
import { Product } from 'src/app/entities/product';
import { Router } from '@angular/router';
import { ProductActions } from '../product.actions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/store';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.scss']
})
export class CreateAuctionComponent implements OnInit {
  productForm: FormGroup;
  isLoading: boolean;
  subscription: Subscription;

  constructor(private fb: FormBuilder, private temp: TempDataService, 
    private router: Router, private productActions: ProductActions, 
    private api: ProductsApiService, private ngRedux: NgRedux<AppState>,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Create new product');

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['',Validators.required],
      images: ['',Validators.required],
      startingPrice: ['',Validators.required],
      minimumBid: ['',Validators.required],
      endDate: ['',Validators.required],
      location: ['',Validators.required],
    });

    this.subscription = this.ngRedux.select(x => x.products).subscribe(state => {
      this.isLoading = state.isLoading;
    });
  }

  onSubmit() {
    let product = this.productForm.value as Product;
    product.dateCreated = new Date();
    if(this.productForm.valid) this.productActions.createNewProduct(product);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
