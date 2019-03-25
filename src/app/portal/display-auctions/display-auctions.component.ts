import { TempDataService } from './../../services/temp-data.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/entities/product';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-display-auctions',
  templateUrl: './display-auctions.component.html',
  styleUrls: ['./display-auctions.component.scss']
})
export class DisplayAuctionsComponent implements OnInit {
  products: Product[];

  constructor(private temp: TempDataService) { }

  ngOnInit() {
    this.products = this.temp.getProducts();
  }

}
