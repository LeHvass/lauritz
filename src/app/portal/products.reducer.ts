import { ProductActions } from './product.actions';
import { tassign } from 'tassign';
import { ProductState } from './../store';
import { Product } from '../entities/product';
import { TempDataService } from '../services/temp-data.service';

// State at startup.
// const ds = new TempDataService();
const INITIAL_STATE: ProductState = {isLoggedIn: undefined, products: TempDataService.products };

export function productsReducer(state: ProductState = INITIAL_STATE, action:any) {
 
  switch (action.type) {
  case ProductActions.LOG_IN:
    console.log(action.payload);
    
    // Not allowed. Cannot change state in reducer. Must make a copy.
    // state.isLoggedIn = action.payload;
    // return state;

    // return Object.assign({}, state, {isLoggedIn: action.payload});
    return tassign(state, { isLoggedIn: action.payload });
   
  case ProductActions.CREATE_PRODUCT:
    // Create a new array with the "old array" and the new product
    console.log(state);

    let newProducts = [...state.products, action.payload];
    let newState = tassign(state, {products: newProducts});
    console.log(newState);
    return newState;
  
  case ProductActions.UPDATE_PRODUCT:
    let productsArrayCopy = [...state.products];

    let productPos = productsArrayCopy.findIndex(element => element._id === action.payload._id)
    productsArrayCopy[productPos] = action.payload; 

    return tassign(state, { products: productsArrayCopy })

  case ProductActions.DELETE_PRODUCT:
    // action.payload should be productId (_id)
    let newProductsAfterDelete = state.products.filter(product => product._id !== action.payload);
    return tassign(state, { products: newProductsAfterDelete });

  // case ProductActions.LOG_IN:
    // return tassign(state, { isBaby: action.payload });
   
    // case ProductActions.LOG_IN:
    // return tassign(state, { isBaby: action.payload });
    default:
    return state;
}
}
