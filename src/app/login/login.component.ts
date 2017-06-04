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
    required: 'Email address is required.',
    minlength: 'Must be under 3.',
    email: 'Please enter a valid email address.'
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(3) ] ],
      // password: ['', [Validators.required, Validators.minLength(3)] ]
    });
    const emailControl = this.loginForm.get('email');

    emailControl.valueChanges.debounceTime(1000).subscribe(
      value => this.setMessage(emailControl)
    );
  }

  setMessage(c: AbstractControl): void {

    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  save(): void {
    console.log(this.loginForm);
    console.log('Saved: ' + JSON.stringify(this.loginForm.value));
  }

}
