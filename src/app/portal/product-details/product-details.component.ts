import { TempDataService } from './../../services/temp-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/entities/product';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(private temp: TempDataService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    // Read the id from the url
    const id = this.route.snapshot.paramMap.get('id');
    // Find the product object based on the id, from the temp-data service.
  
    // A non-finished way to call a method in the temp data service. 
    this.product = this.temp.findProduct(id);

    // Display the product in the ui.

  }
}
