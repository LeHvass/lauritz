import { TempDataService } from './../../services/temp-data.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/entities/product';
import { template } from '@angular/core/src/render3';
import { AppState } from 'src/app/store';
import { NgRedux } from '@angular-redux/store';
import { ProductActions } from '../product.actions';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Form } from '@angular/forms';

@Component({
  selector: 'app-display-auctions',
  templateUrl: './display-auctions.component.html',
  styleUrls: ['./display-auctions.component.scss']
})
export class DisplayAuctionsComponent implements OnInit {
  products: Product[];
  isLoading: boolean;
  minPrice: number;
  maxPrice: number;
  maxPriceForm: Form;
  maxPriceInput: number;
  filterMetaData;


  constructor(
    private temp: TempDataService, 
    private ngRedux: NgRedux<AppState>,
    private prodActions: ProductActions,
    private titleService: Title,
    private fb: FormBuilder) { }

  ngOnInit() {
    // this.products = this.temp.getProducts();
    //Subscribe to part of the store. Here we sub. to the products, so we can show them in the UI.

    this.ngRedux.select(state => state.products).subscribe(res => {
      this.products = res.products;
      this.isLoading = res.isLoading;

      this.titleService.setTitle('Viewing all products');

      this.maxPrice = Math.max.apply(Math, this.products.map((product) => {
        // højeste bud, ellers starting price
        if(product.bids && product.bids.length > 0) {
          return Math.max.apply(Math, product.bids.map(bid => { return bid.amount }));
        } else {
          return product.startingPrice;
        }
      }))
      this.minPrice = Math.min.apply(Math, this.products.map((product) => {
        // højeste bud, ellers starting price
        if(product.bids && product.bids.length > 0) {
          return Math.max.apply(Math, product.bids.map(bid => { return bid.amount }));
        } else {
          return product.startingPrice;
        }
      }))
      this.maxPriceInput = this.maxPrice;
      /*this.maxPriceForm = this.fb.group({
        bid: [this.bidAmount, [Validators.required, Validators.min(this.bidAmount)]]
      });*/
    });

    // this.filterMetaData = {count}
    this.filterMetaData = {};
    this.filterMetaData.count = 0;
  }
  onProductClick(dataPassedToMe) {
    console.log(dataPassedToMe);
  }

}
