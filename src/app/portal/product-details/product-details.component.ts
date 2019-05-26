import { TempDataService } from './../../services/temp-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Bid } from 'src/app/entities/product';
import { ProductActions } from '../product.actions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  products: Product[];
  bid: Bid;
  bidAmount: number;
  bidForm: FormGroup;
  numberOfBids: number;

  constructor(private temp: TempDataService, 
    private route: ActivatedRoute,
    private ngRedux: NgRedux<AppState>,
    private prodActions: ProductActions,
    private fb: FormBuilder,) { }

  ngOnInit() {
    // Empty product

    // Get product id from URL
    const id = this.route.snapshot.paramMap.get('id');
    
    this.ngRedux.select(state => state.products).subscribe(res => {
      this.product = res.products.find(product => product._id == id);

      // set number of bids
      this.numberOfBids = this.product && this.product.bids ? this.product.bids.length : 0;

      // set values for bid form
      if(this.product && this.product.bids) {
        // find highest bid
        let highestBid = Math.max.apply(Math,this.product.bids.map(function(bid){return bid.amount;}))
        // add minimum increase
        let minimumBid = highestBid + this.product.minimumBid;
        // set bid
        this.bidAmount = minimumBid;
      } else if (this.product && this.product.startingPrice) {
        this.bidAmount = this.product.startingPrice;
      }
      console.log(this.product)

      this.bidForm = this.fb.group({
        bid: [this.bid, [Validators.required, Validators.min(this.bidAmount)]]
      });
      //this.isLoading = res.isLoading;
    });

  }

  onSubmit() {
    
    console.log('bid form submitted')
    let bidAmount = this.bidForm.value.bid;
    let bid = {
      amount: bidAmount,
      userId: 'test',
      date: new Date()
    } as Bid;
    this.product.bids.push();
    console.log(bid);
    this.prodActions.createBid(this.product);
  }
}
