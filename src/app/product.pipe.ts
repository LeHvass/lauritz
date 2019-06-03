import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './entities/product';

@Pipe({
  name: 'productFilter'
})
export class ProductPipe implements PipeTransform {
  productPrice: number;

  transform(
    products: Product[], search: any = "",
    maxPrice: number, filterMetaData = { count: 5 }): any {

    // Filter by search
    let result = products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.location.toLowerCase().includes(search.toLowerCase()) ||
      product.user.username.toLowerCase().includes(search.toLowerCase()) ||
      (product.user.firstname.toLowerCase() + " " + product.user.lastname.toLowerCase()).includes(search.toLowerCase())
    );

    // Filter by max price
    if (maxPrice != null) {
      result = result.filter(product => {
        let productPrice = (product.bids && product.bids.length > 0)
          ? Math.max.apply(Math, product.bids.map(bid => { return bid.amount }))
          : product.startingPrice;

        return productPrice <= maxPrice ? true : false;
      })
    }

    filterMetaData.count = result.length;

    return result;
  }

}
