import { ProductActions } from './../portal/product.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login', // name of component
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  // DI - Dependency injection
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router,
    private authService: AuthService, private prodActions: ProductActions, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Login');

    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]], // multiple validators
        password: ['', Validators.required] // Single validator
      }
    )
  }



  onSubmit(): void {
    this.snackBar.open('One second, logging in..', 'Close', {
      duration: 2000,
    });

    
    
    console.log(this.loginForm);

    if (this.loginForm.valid) {
      
      this.prodActions.loggedIn(true); // Example of dispatch action from component.

      // Send the data to the server to verify the user login
      // navigate after successful login.

      console.log("First")
      if (this.loginForm.value.username === 'admin') {
        // call the admin authService.
      } else {
        this.authService.login().subscribe(result => {
          console.log("Third");
          if (result) {
            let url = this.authService.redirectUrl ? this.authService.redirectUrl : '/portal/display-auctions';
            this.router.navigate([url]); // Use the router to go to a route, home.
          }
          else {
            // Invalid login
          }
        });
      }
      console.log("Second")

      

    }

  }
}
