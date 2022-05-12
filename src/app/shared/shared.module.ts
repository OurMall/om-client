import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KeyFilterModule } from 'primeng/keyfilter';

import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarLinkComponent } from './components/navbar/navbar-link/navbar-link.component';

@NgModule({
	declarations: [NavbarComponent, NavbarLinkComponent],
	imports: [
		CommonModule,
		RouterModule,
		KeyFilterModule
	],
	exports: [
		NavbarComponent,
		KeyFilterModule
	],
})
export class SharedModule {}
