import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { Product } from './entities/product';
import { productsReducer } from './portal/products.reducer';

export class ProductState {
  products: Product[];
  isLoggedIn: boolean; // Should be in an auth section and not in products
}
export class AppState {
  products?: ProductState;
}
export const rootReducer = combineReducers<AppState>({
products: productsReducer,

router: routerReducer
} as any);
