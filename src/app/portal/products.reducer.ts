import { ProductActions } from './product.actions';
import { tassign } from 'tassign';
import { ProductState } from './../store';
import { Product } from '../entities/product';
import { TempDataService } from '../services/temp-data.service';

// State at startup.
const INITIAL_STATE: ProductState = {
  products: TempDataService.products,
  isLoading: false
};

export function productsReducer(state: ProductState = INITIAL_STATE, action: any) {

  switch (action.type) {

    case ProductActions.GET_PRODUCTS_LOADING:
      return tassign(state, { isLoading: true });

    case ProductActions.GET_PRODUCTS_SUCCESS:
      return tassign(state, { products: action.payload, isLoading: false });

    case ProductActions.GET_PRODUCTS_FAILURE:
      return tassign(state, { isLoading: false });

    case ProductActions.CREATE_PRODUCT_FAILURE:
      return tassign(state, { isLoading: false});

    case ProductActions.CREATE_PRODUCT_LOADING:
      return tassign(state, { isLoading: true });

    case ProductActions.CREATE_PRODUCT_SUCCESS:
      let newProducts = [...state.products, action.payload];
      let newState = tassign(state, { products: newProducts, isLoading: false });
      return newState;

    case ProductActions.UPDATE_PRODUCT:
      let stateUpdate = [...state.products];
      let index = stateUpdate.findIndex(prod => prod._id === action.payload._id);
      stateUpdate[index] = action.payload;
      return tassign(state, { products: stateUpdate });

    case ProductActions.DELETE_PRODUCT_LOADING:
      return tassign(state, {isLoading: true});

    case ProductActions.DELETE_PRODUCT_SUCCESS:
      let newProductsAfterDelete = state.products.filter(product => product._id !== action.payload);
      return tassign(state, { products: newProductsAfterDelete, isLoading: false });

    case ProductActions.DELETE_PRODUCT_FAILURE:
      return state;

    default:
      return state;
  }
}
