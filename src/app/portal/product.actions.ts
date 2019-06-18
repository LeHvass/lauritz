import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { Product } from '../entities/product';
import { ProductsApiService } from '../services/products-api.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ProductActions {
  constructor(
    private ngRedux: NgRedux<AppState>, private api: ProductsApiService,
    private router: Router) { }

  static CREATE_PRODUCT_LOADING: string = 'CREATE_PRODUCT_LOADING';
  static CREATE_PRODUCT_SUCCESS: string = 'CREATE_PRODUCT_SUCCESS';
  static CREATE_PRODUCT_FAILURE: string = 'CREATE_PRODUCT_FAILURE';


  static DELETE_PRODUCT_LOADING: string = 'DELETE_PRODUCT_LOADING';
  static DELETE_PRODUCT_SUCCESS: string = 'DELETE_PRODUCT_SUCCESS';
  static DELETE_PRODUCT_FAILURE: string = 'DELETE_PRODUCT_FAILURE';

  static UPDATE_PRODUCT: string = 'UPDATE_PRODUCT';
  static UPDATE_PRODUCT_FAILURE: string = 'UPDATE_PRODUCT_FAILURE';

  static GET_PRODUCTS_SUCCESS: string = 'GET_PRODUCTS_SUCCESS';
  static GET_PRODUCTS_FAILURE: string = 'GET_PRODUCTS_FAILURE';
  static GET_PRODUCTS_LOADING: string = 'GET_PRODUCTS_LOADING';

  getProducts() {
    this.ngRedux.dispatch({ type: ProductActions.GET_PRODUCTS_LOADING });

    this.api.getProducts().subscribe(result => {
      this.ngRedux.dispatch({
        type: ProductActions.GET_PRODUCTS_SUCCESS,
        payload: result.filter(prod => prod.customerId === 'chhv')
      })
    }, error => {
      this.ngRedux.dispatch({
        type: ProductActions.GET_PRODUCTS_FAILURE,
        payload: error
      });
    });
  }

  getProduct(id: string) {
    this.ngRedux.dispatch({ type: ProductActions.GET_PRODUCTS_LOADING });

    this.api.getProducts().subscribe(result => {
      this.ngRedux.dispatch({
        type: ProductActions.GET_PRODUCTS_SUCCESS,
        payload: result.filter(prod => prod._id === id)
      })
    }, error => {
      this.ngRedux.dispatch({
        type: ProductActions.GET_PRODUCTS_FAILURE,
        payload: error
      });
    });
  }
  
  createNewProduct(product: Product): void {
    this.ngRedux.dispatch({
      type: ProductActions.CREATE_PRODUCT_LOADING
    });

    this.api.createProduct(product).subscribe(dataFromWs => {
      this.ngRedux.dispatch({
        type: ProductActions.CREATE_PRODUCT_SUCCESS,
        payload: dataFromWs
      });
      this.router.navigate(['/portal/display-auctions']);

    }, whatever => {
      this.ngRedux.dispatch({
        type: ProductActions.CREATE_PRODUCT_FAILURE,
        payload: whatever
      })
    });
  }

  createBid(product: Product): void {
    /*this.ngRedux.dispatch({
      type: ProductActions.CREATE_BID_LOADING
    });*/

    this.api.updateProduct(product).subscribe(dataFromWs => {
      /*this.ngRedux.dispatch({
        type: ProductActions.CREATE_PRODUCT_SUCCESS,
        payload: dataFromWs
      });*/
      this.ngRedux.dispatch({
        type: ProductActions.UPDATE_PRODUCT,
        payload: product
      });

    }, error => {
      console.log(error)
      this.ngRedux.dispatch({
        type: ProductActions.UPDATE_PRODUCT_FAILURE,
        payload: error
      })
    });

    // Call api
    // Dispatch action on success
    // Dispatch action on failure
  }

  updateProduct(product: Product): void {
    this.ngRedux.dispatch({
      type: ProductActions.UPDATE_PRODUCT,
      payload: product
    });
  }

  deleteProduct(id: string): void {
    this.ngRedux.dispatch({
      type: ProductActions.DELETE_PRODUCT_LOADING,
    });

    this.api.deleteProduct(id).subscribe(dataFromWs => {
      this.ngRedux.dispatch({
        type: ProductActions.DELETE_PRODUCT_SUCCESS,
        payload: id
      });
      this.router.navigate(['/portal/display-auctions']);

    }, whatever => {
      this.ngRedux.dispatch({
        type: ProductActions.DELETE_PRODUCT_FAILURE,
        payload: whatever
      })
    });
  }

}
