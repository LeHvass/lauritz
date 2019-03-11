import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MustMatch } from './../_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      emailConfirm: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', Validators.required],
      phone: ['', Validators.required],
      birthdate: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required]
    }, {
        validator: [
          MustMatch('password', 'passwordConfirm'),
          MustMatch('email', 'emailConfirm')
        ]
      });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.registerForm.valid ? console.log('valid') : console.log('invalid');
    console.log(this.registerForm)
  }
}