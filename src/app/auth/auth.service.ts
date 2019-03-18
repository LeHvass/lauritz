import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(isAdmin: boolean): Observable<boolean> {
    console.log("login from service");
    console.log('is admin: ' + isAdmin);
    return of(true).pipe(
      delay(1000),
      tap(val => {
        console.log("now I am logged in!");
        this.isLoggedIn = true;
        this.isAdmin = isAdmin ? true : false;
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}