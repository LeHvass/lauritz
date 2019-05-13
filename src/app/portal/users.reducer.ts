import { ProductActions } from './product.actions';
import { tassign } from 'tassign';
import { ProductState, UserState } from '../store';
import { Product } from '../entities/product';
import { TempDataService } from '../services/temp-data.service';
import { UsersActions } from './users.actions';

// State at startup.
// const ds = new TempDataService();
const INITIAL_STATE: UserState = {users: []}

export function usersReducer(state: UserState = INITIAL_STATE, action:any) {
 
  switch (action.type) {
    case UsersActions.RATE_USER:
    // action.payload.userId
    // action.payload.rating
    // Find the user object that matches the userId
    // Add the rating object to the array of objects in the user.ratings
    

    
  
    default:
    return state;
}
}
