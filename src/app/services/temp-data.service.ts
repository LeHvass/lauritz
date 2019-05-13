import { Injectable } from '@angular/core';
import { Product, Bid } from '../entities/product';
import { Gender } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class TempDataService {

  static products: Product[] = [
    {_id: '1', user: 
      { _id:'1', username: 'abc', email: 'abc@kea.dk', 
      firstname: 'Asger', lastname: 'Poulsen', phone: '12121212', 
      gender: Gender.Male, birthDate: new Date(1985, 2, 2),
    profileImage: 'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg'},
      
    name: 'Hair Brush', description: 'test bla bla', 
    startingPrice: 100, minimumBid: 10, 
    images: ['https://cdn.shopify.com/s/files/1/0066/0052/files/Hair_brush_guide_6.jpg'], dateCreated: new Date(2019,2,18), 
    endDate: new Date(2019,3,18), bids: [], location: 'Copenhagen',
    
    },
    
    {_id: '2', user: 
      { _id:'1', username: 'abc', email: 'abc@kea.dk', 
      firstname: 'Asger', lastname: 'Poulsen', phone: '12121212', 
      gender: Gender.Male, birthDate: new Date(1985, 2, 2),
      profileImage: 'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg'
    },
      
    name: 'Mirror', description: 'test bla bla', 
    startingPrice: 1000, minimumBid: 50, 
    images: ['https://www.ikea.com/gb/en/images/products/stockholm-mirror-walnut-veneer__0380568_pe555467_s5.jpg'], dateCreated: new Date(2019,2,18), 
    endDate: new Date(2019,3,18), bids: [], location: 'Copenhagen',
    },
    
  ]
  
  constructor() { }

  addBid(bid: Bid, productId: string) : void {
    /// Rules to accept a bid or a custom validator

    // Find product based on productId
    // const product = this.findProduct(productId);
    // Add bid obj. to product's bid array.
    // product.bids.push(bid);
    console.log("fix error here");
  }

  addProduct(product: Product): void {
    // Should add the product to the array.
    // push it!
    // We do not have a logged in user yet.
    product.user = {
      _id:'1', username: 'abc', email: 'abc@kea.dk', 
       firstname: 'Asger', lastname: 'Poulsen', phone: '12121212', 
       gender: Gender.Male, birthDate: new Date(1985, 2, 2),
       profileImage: 'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg'
     };
     product.dateCreated = new Date();
     product.bids = [];
     product.images = ['https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg'];

     
    // this.products.push(product);
  }

  // getProducts() {
  //   return this.products;
  // }

  // findProduct(id: string) : Product {
  //   return this.products.find(product => product._id === id);
  // }

}
