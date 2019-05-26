import { ProductActions } from './portal/product.actions';
import { ProductsApiService } from './services/products-api.service';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  title = 'lauritz';

  constructor(private prodActions: ProductActions, private titleService: Title) {
    this.prodActions.getProducts();

    // this.api.getProducts().subscribe(result => {
    //   let filtered = result.filter(x => x.customerId === 'chrk2');
    //   console.log(filtered);
    // })
  }
  
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
