import { ProductActions } from './portal/product.actions';
import { ProductsApiService } from './services/products-api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lauritz';

  constructor(private prodActions: ProductActions) {
    this.prodActions.getProducts();

console.log('test');

    // this.api.getProducts().subscribe(result => {
    //   let filtered = result.filter(x => x.customerId === 'chrk2');
    //   console.log(filtered);
    // })
  }
}
