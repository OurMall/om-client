import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
	FormsModule,
	ReactiveFormsModule,
    OverviewRoutingModule
  ]
})
export class OverviewModule { }
