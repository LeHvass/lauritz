import { TempDataService } from './../../services/temp-data.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/entities/product';
import { template } from '@angular/core/src/render3';
import { AppState } from 'src/app/store';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'app-display-auctions',
  templateUrl: './display-auctions.component.html',
  styleUrls: ['./display-auctions.component.scss']
})
export class DisplayAuctionsComponent implements OnInit {
  products: Product[];

  constructor(private temp: TempDataService, private ngRedux: NgRedux<AppState>) { }

  ngOnInit() {
    // this.products = this.temp.getProducts();
    //Subscribe to part of the store. Here we sub. to the products, so we can show them in the UI.
    this.ngRedux.select(state => state.products).subscribe(res => {
      this.products = res.products;
    });
 

  }
  onProductClick(dataPassedToMe) {
    console.log(dataPassedToMe);
  }

}
