import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { Product } from '../entities/product';

@Injectable({ providedIn: 'root'})
export class ProductActions {
constructor (
  private ngRedux: NgRedux<AppState>) {} 

  static LOG_IN: string = 'LOG_IN'; 
  static CREATE_PRODUCT: string = 'CREATE_PRODUCT';
  static UPDATE_PRODUCT: string = 'UPDATE_PRODUCT';
  static DELETE_PRODUCT: string = 'DELETE_PRODUCT';
  
  // This should be in an Auth-Section and not in the product.
  // I include it here for now, to make the first redux exercise easier.
  // Action creator - calls the redux library.




  loggedIn(isLoggedIn: boolean): void {
    console.log(isLoggedIn);
    this.ngRedux.dispatch({
      type: ProductActions.LOG_IN,
      payload: isLoggedIn
    });
  }
  createNewProduct(product: Product) : void {
    this.ngRedux.dispatch(
      { 
        type: ProductActions.CREATE_PRODUCT,
        payload: product
      }
    );
  }
  updateProdut(product: Product) : void {
    this.ngRedux.dispatch(
      {
        type: ProductActions.UPDATE_PRODUCT,
        payload: product
      }
    )
  }
  deleteProduct(id: string) : void {
    this.ngRedux.dispatch({
      type: ProductActions.DELETE_PRODUCT,
      payload: id
    });
  }

}
