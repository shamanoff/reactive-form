import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../customers/customer';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  customer: Customer = new Customer();
  emailMessage: string;
  passwordMessage: string;

  private validationMessages = {
    required: 'This field is required.',
    minlength: 'Must be longer than three characters.',
    email: 'Please enter a valid email address.'
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(3) ] ],
      password: ['', [Validators.required, Validators.minLength(3)] ]
    });
    const emailControl = this.loginForm.get('email');
    emailControl.valueChanges.debounceTime(1000).subscribe(
      value => this.setEmailMessage(emailControl)
    );
    const passwordControl = this.loginForm.get('password');
    passwordControl.valueChanges.debounceTime(1000).subscribe(
      value => this.setPasswordMessage(passwordControl)
    );
  }

  setEmailMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  setPasswordMessage(c: AbstractControl): void {
    this.passwordMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.passwordMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }
  save(): void {
    console.log(this.loginForm);
    console.log('Saved: ' + JSON.stringify(this.loginForm.value));
    this.loginForm.reset();
  }

}
