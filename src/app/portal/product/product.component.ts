import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/entities/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() nameOfTheEventOr: EventEmitter<any> = new EventEmitter<any>();

  currentPrice: number;

  constructor() { }

  ngOnInit() {
    if (this.product && this.product.bids) {
      // Find highest bid
      let highestBid = Math.max.apply(Math, this.product.bids.map(function (bid) { return bid.amount; }))
      this.currentPrice = highestBid;
    } else if (this.product && this.product.startingPrice) {
      this.currentPrice = this.product.startingPrice;
    }
  }

  onProductClicked() {
    this.nameOfTheEventOr.emit(this.product);
  }

}
