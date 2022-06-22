import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KeyFilterModule } from 'primeng/keyfilter';

import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarLinkComponent } from './components/navbar/navbar-link/navbar-link.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AccountComponent } from './components/account/account.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { WorkspaceCardComponent } from './components/workspace-card/workspace-card.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
	declarations: [
		NavbarComponent,
		NavbarLinkComponent,
		LoaderComponent,
		AccountComponent,
		AlertMessageComponent,
		WorkspaceCardComponent,
		ProfileInfoComponent,
		ProductCardComponent,
		UploaderComponent,
		FooterComponent
	],
	imports: [CommonModule, RouterModule, KeyFilterModule],
	exports: [
		NavbarComponent,
		KeyFilterModule,
		LoaderComponent,
		AccountComponent,
		AlertMessageComponent,
		WorkspaceCardComponent,
		ProfileInfoComponent,
		ProductCardComponent,
		UploaderComponent,
		FooterComponent
	],
})
export class SharedModule {}
