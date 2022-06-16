import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductComponent,
  ],
  imports: [
    CommonModule,
	FormsModule,
	ReactiveFormsModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
