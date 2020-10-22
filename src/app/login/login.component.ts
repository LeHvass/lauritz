import { ProductActions } from './../portal/product.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Title } from '@angular/platform-browser';
import { UsersActions } from '../portal/users.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login', // name of component
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isAdmin: Boolean = false;
  subscription: Subscription;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router,
    private authService: AuthService, private prodActions: ProductActions, private titleService: Title, private userActions: UsersActions) {
  }

  ngOnInit() {
    this.titleService.setTitle('Login');

    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', Validators.required]
      }
    )
  }

  onSubmit(): void {
    this.snackBar.open('One second, logging in..', 'Close', {
      duration: 2000,
    });

    if (this.loginForm.valid) {

      this.userActions.loggedIn(true);

      if (this.loginForm.value.username === 'admin') {
        this.isAdmin = true;
      }

      this.subscription = this.authService.login(this.isAdmin).subscribe(result => {
        if (result) {
          let url = this.authService.redirectUrl ? this.authService.redirectUrl : '/portal/display-auctions';
          this.router.navigate([url]);
        }
        else {
          // Invalid login
        }
      });

    }

  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
