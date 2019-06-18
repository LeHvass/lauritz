import { ProductActions } from './portal/product.actions';
import { ProductsApiService } from './services/products-api.service';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './auth/auth.service';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './store';
import { UsersActions } from './portal/users.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  title: string = 'Auction House';
  isLoggedIn: boolean = false;

  constructor(private prodActions: ProductActions, private ngRedux: NgRedux<AppState>, private titleService: Title, private authService: AuthService, private userActions: UsersActions) {
    this.ngRedux.select(x => x.users.isLoggedIn).subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.prodActions.getProducts();
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  logOut() {
    this.userActions.loggedIn(false);
  }
}
