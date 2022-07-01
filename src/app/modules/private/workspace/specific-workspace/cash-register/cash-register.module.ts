import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeModule } from '@app/shared/prime.module';
import { SharedModule } from '@app/shared/shared.module';
import { CashRegisterRoutingModule } from './cash-register-routing.module';
import { CashRegisterComponent } from './cash-register.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input'


@NgModule({
  declarations: [
    CashRegisterComponent
  ],
  imports: [
    CommonModule,
    CashRegisterRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	PrimeModule,
	SharedModule,
  MatAutocompleteModule,
  MatInputModule
  ]
})
export class CashRegisterModule { }
