import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { UserRegisterComponent } from './user-register/user-register.component';

@NgModule({
  declarations: [
    SignupComponent,
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
	ReactiveFormsModule
  ]
})
export class SignupModule { }
