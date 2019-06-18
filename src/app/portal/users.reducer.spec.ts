import { ProductState } from './../store';
import { TempDataService } from './../services/temp-data.service';
var deepFreeze = require('deep-freeze');
import { usersReducer } from './users.reducer';
import * as types from './users.actions';
import { Gender } from '../entities/user';

describe('users reducer', () => {
  
  it('set isLoggedIn to true', () => {
      
    let state = {isLoggedIn: undefined};
    deepFreeze(state);
    
    expect( usersReducer(state, { type: types.UsersActions.LOG, payload: true }))
      .toEqual({isLoggedIn: true});
  });

});


