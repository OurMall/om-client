import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarLinkComponent } from './components/navbar/navbar-link/navbar-link.component';

@NgModule({
	declarations: [NavbarComponent, NavbarLinkComponent],
	imports: [
		CommonModule,
		RouterModule
	],
	exports: [NavbarComponent],
})
export class SharedModule {}
