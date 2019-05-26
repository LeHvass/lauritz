import { ProductActions } from './product.actions';
import { tassign } from 'tassign';
import { ProductState } from './../store';
import { Product } from '../entities/product';
import { TempDataService } from '../services/temp-data.service';

// State at startup.
// const ds = new TempDataService();
const INITIAL_STATE: ProductState = { isLoggedIn: undefined, products: TempDataService.products, isLoading: false };

export function productsReducer(state: ProductState = INITIAL_STATE, action: any) {

  switch (action.type) {
    case ProductActions.LOG_IN:
      console.log(action.payload);
      return tassign(state, { isLoggedIn: action.payload });

    case ProductActions.GET_PRODUCTS_LOADING:
      return tassign(state, { isLoading: true });

    case ProductActions.GET_PRODUCTS_SUCCESS:
      console.log(action.payload);

      return tassign(state, { products: action.payload, isLoading: false });

    case ProductActions.GET_PRODUCTS_FAILURE:
      console.log(action.payload);
      return tassign(state, { isLoading: false });


    case ProductActions.CREATE_PRODUCT_FAILURE:
      // display an error message  
      return state;

    case ProductActions.CREATE_PRODUCT_LOADING:
      return tassign(state, { isLoading: true });

    case ProductActions.CREATE_PRODUCT_SUCCESS:
      // Create a new array with the "old array" and the new product
      console.log(state);

      let newProducts = [...state.products, action.payload];
      let newState = tassign(state, { products: newProducts });
      console.log(newState);
      return newState;


    case ProductActions.UPDATE_PRODUCT:
      //action.payload is a product object
      let stateUpdate = [...state.products];
      let index = stateUpdate.findIndex(prod => prod._id === action.payload._id);
      stateUpdate[index] = action.payload;
      return tassign(state, { products: stateUpdate });

    case ProductActions.DELETE_PRODUCT:
      // action.payload should be productId (_id)

      let newProductsAfterDelete = state.products.filter(product => product._id !== action.payload);
      return tassign(state, { products: newProductsAfterDelete });

    default:
      return state;
  }
}
