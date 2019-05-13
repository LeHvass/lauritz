import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { Product } from './entities/product';
import { productsReducer } from './portal/products.reducer';
import { UserVm } from './entities/user';
import { usersReducer } from './portal/users.reducer';

export class UserState {
  users: UserVm[];
}
export class ProductState {
  products: Product[];
  isLoggedIn: boolean; // Should be in an auth section and not in products
  isLoading: boolean;
  isDeleting: boolean;
}
export class AppState {
  products?: ProductState;
  users?: UserState;
}
export const rootReducer = combineReducers<AppState>({
products: productsReducer,
users: usersReducer,

router: routerReducer
} as any);
