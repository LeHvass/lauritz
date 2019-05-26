import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './entities/product';

@Pipe({
  name: 'productFilter'
})
export class ProductPipe implements PipeTransform {

  transform(products: Product[], search: any = ""): any {
    console.log(products);
    console.log(search);

    //let result = products.filter(product => product.user.ratings.)

    let result = products.filter(product => 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.location.toLowerCase().includes(search.toLowerCase()) ||
      product.user.username.toLowerCase().includes(search.toLowerCase()) ||
      (product.user.firstname.toLowerCase() + " " + product.user.lastname.toLowerCase()).includes(search.toLowerCase())
    );
    
    return result;
  }

}
