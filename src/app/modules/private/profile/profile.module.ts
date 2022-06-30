import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PrimeModule } from '@shared/prime.module';
import { SharedModule } from '@shared/shared.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';


@NgModule({
	declarations: [ProfileComponent],
	imports: [
		CommonModule,
		ProfileRoutingModule,
		SharedModule,
		PrimeModule,
		ReactiveFormsModule
	],
	exports: [],
})
export class ProfileModule {}
