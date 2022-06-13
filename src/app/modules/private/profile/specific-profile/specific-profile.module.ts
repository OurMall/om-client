import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecificProfileRoutingModule } from './specific-profile-routing.module';
import { SpecificProfileComponent } from './specific-profile.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    SpecificProfileComponent
  ],
  imports: [
    CommonModule,
    SpecificProfileRoutingModule,
	SharedModule,
  ]
})
export class SpecificProfileModule { }
