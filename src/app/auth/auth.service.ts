import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    console.log("login from service");
    
    return of(true).pipe(
      delay(1000),
      tap(val => {
        console.log("now I am logged in!");
        this.isLoggedIn = true
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}