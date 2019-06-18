import { tassign } from 'tassign';
import { UserState } from '../store';
import { UsersActions } from './users.actions';

// State at startup.
const INITIAL_STATE: UserState = { isLoggedIn: false, users: [] }

export function usersReducer(state: UserState = INITIAL_STATE, action: any) {

  switch (action.type) {
    case UsersActions.LOG:
      console.log(action.payload);
      return tassign(state, { isLoggedIn: action.payload });
    default:
      return state;
  }
}
