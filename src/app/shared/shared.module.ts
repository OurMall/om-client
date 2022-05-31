import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KeyFilterModule } from 'primeng/keyfilter';

import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarLinkComponent } from './components/navbar/navbar-link/navbar-link.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AccountComponent } from './components/account/account.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';

@NgModule({
	declarations: [NavbarComponent, NavbarLinkComponent, LoaderComponent, AccountComponent, AlertMessageComponent],
	imports: [CommonModule, RouterModule, KeyFilterModule],
	exports: [NavbarComponent, KeyFilterModule, LoaderComponent, AccountComponent, AlertMessageComponent],
})
export class SharedModule {}
