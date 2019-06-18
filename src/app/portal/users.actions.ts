import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { Product } from '../entities/product';
import { Rating } from '../entities/user';

@Injectable({ providedIn: 'root'})
export class UsersActions {
constructor (
  private ngRedux: NgRedux<AppState>) {} 

  static RATE_USER: string = 'RATE_USER'
  static LOG: string = 'LOG'

  loggedIn(isLoggedIn: boolean): void {
    //console.log(isLoggedIn);
    this.ngRedux.dispatch({
      type: UsersActions.LOG,
      payload: isLoggedIn
    });
  }
  
  rateUser(userId: string, rating: Rating) {
    this.ngRedux.dispatch({type:  UsersActions.RATE_USER, payload: {userId, rating} });
  }

}
