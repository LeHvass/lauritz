import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { Product } from '../entities/product';
import { ProductsApiService } from '../services/products-api.service';

@Injectable({ providedIn: 'root'})
export class ProductActions {
constructor (
  private ngRedux: NgRedux<AppState>, private api: ProductsApiService) {} 

  static LOG_IN: string = 'LOG_IN'; 
  static CREATE_PRODUCT: string = 'CREATE_PRODUCT';
  static UPDATE_PRODUCT: string = 'UPDATE_PRODUCT';

  static DELETE_PRODUCT_LOADING: string = 'DELETE_PRODUCT_LOADING';
  static DELETE_PRODUCT_SUCCESS: string = 'DELETE_PRODUCT_SUCCESS';
  static DELETE_PRODUCT_FAILURE: string = 'DELETE_PRODUCT_FAILURE';
  
  static GET_PRODUCTS_SUCCESS: string = 'GET_PRODUCTS_SUCCESS';
  static GET_PRODUCTS_FAILURE: string = 'GET_PRODUCTS_FAILURE';
  static GET_PRODUCTS_LOADING: string = 'GET_PRODUCTS_LOADING';
  
  // This should be in an Auth-Section and not in the product.
  // I include it here for now, to make the first redux exercise easier.
  // Action creator - calls the redux library.


  getProducts() {
    this.ngRedux.dispatch({type: ProductActions.GET_PRODUCTS_LOADING});

    this.api.getProducts().subscribe(result => {
      console.log(result);
      this.ngRedux.dispatch({
        type: ProductActions.GET_PRODUCTS_SUCCESS,
        payload: result.filter(prod => prod.customerId === 'chrk2') })
    }, error=> {
      this.ngRedux.dispatch({
        type: ProductActions.GET_PRODUCTS_FAILURE,
        payload: error
      });
    });
    
  }


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
  updateProduct(product: Product) : void {
    this.ngRedux.dispatch({
      type: ProductActions.UPDATE_PRODUCT,
      payload: product
    });
  }

  deleteProduct(id: string) : void {
    this.ngRedux.dispatch({type: ProductActions.DELETE_PRODUCT_LOADING});

    this.api.getProducts().subscribe(result => {
      console.log(result);
      this.ngRedux.dispatch({
        type: ProductActions.DELETE_PRODUCT_SUCCESS,
        payload: result.filter(prod => prod.customerId === 'chhv') })
    }, error=> {
      this.ngRedux.dispatch({
        type: ProductActions.DELETE_PRODUCT_FAILURE,
        payload: error
      });
    });
  }

}
