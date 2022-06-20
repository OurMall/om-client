import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    ProductComponent,
  ],
  imports: [
    CommonModule,
	FormsModule,
	SharedModule,
	ReactiveFormsModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
