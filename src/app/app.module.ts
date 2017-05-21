import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { SignupComponent } from './signup/signup.component';
import {RouterModule, Routes} from "@angular/router";


const appRoutes: Routes = [
  {path: '', component: CustomersComponent},
  {path: 'signup', component: SignupComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
