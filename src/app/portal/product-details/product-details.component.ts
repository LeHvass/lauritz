import { TempDataService } from './../../services/temp-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, Bid } from 'src/app/entities/product';
import { ProductActions } from '../product.actions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
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
  bidCount: number;
  currentPrice: number;
  isAdmin: boolean = false;
  unsubscribe;

  constructor(private temp: TempDataService,
    private route: ActivatedRoute,
    private ngRedux: NgRedux<AppState>,
    private prodActions: ProductActions,
    private fb: FormBuilder,
    private titleService: Title,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    // Get product id from URL
    const id = this.route.snapshot.paramMap.get('id');

    this.isAdmin = this.authService.isAdmin;

    this.unsubscribe = this.ngRedux.select(state => state.products).subscribe(res => {
      console.log('new state detected');
      console.log(res.products);
      if (res.products.length <= 0) {
        return;
      }
      this.product = res.products.find(product => product._id == id);
      if (!this.product) {
        return;
      }

      this.bidCount = this.product.bids ? this.product.bids.length : 0;

      console.log(this.product);
      this.titleService.setTitle(this.product.name);

      // Set values for bid form
      if (this.product && this.product.bids) {
        // Find highest bid
        let highestBid = Math.max.apply(Math, this.product.bids.map(function (bid) { return bid.amount; }))
        this.currentPrice = highestBid;

        // Add minimum increase
        let minimumBid = highestBid + this.product.minimumBid;
        // Set bid
        this.bidAmount = minimumBid;
      } else if (this.product && this.product.startingPrice) {
        this.currentPrice = this.product.startingPrice;
        this.bidAmount = this.product.startingPrice;
      }

      this.bidForm = this.fb.group({
        bid: [this.bidAmount, [Validators.required, Validators.min(this.bidAmount)]]
      });

    });
  }

  deleteProduct() {
    console.log('deleting product')
    console.log(this.product);
    this.prodActions.deleteProduct(this.product._id);
    //this.router.navigateByUrl('/portal/display-auctions');
  }

  onSubmit() {
    if (this.bidForm.valid) {
      console.log('bid form submitted')
      let bidAmount = this.bidForm.value.bid;
      let bid = {
        amount: bidAmount,
        userId: 'test',
        date: new Date()
      } as Bid;

      if (!this.product.bids) {
        this.product.bids = [];
      }

      this.product.bids.push(bid);
      console.log(bid);
      this.prodActions.createBid(this.product);
    }
  }
  
  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}
