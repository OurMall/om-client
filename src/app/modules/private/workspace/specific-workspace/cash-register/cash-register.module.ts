import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeModule } from '@app/shared/prime.module';
import { SharedModule } from '@app/shared/shared.module';
import { CashRegisterRoutingModule } from './cash-register-routing.module';
import { CashRegisterComponent } from './cash-register.component';


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
  ]
})
export class CashRegisterModule { }
