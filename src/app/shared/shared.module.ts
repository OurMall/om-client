import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KeyFilterModule } from 'primeng/keyfilter';

import { PrimeModule } from './prime.module';
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
import { PostCardComponent } from './components/post-card/post-card.component';
import { SearchEngineComponent } from './components/search-engine/search-engine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
		FooterComponent,
		PostCardComponent,
		SearchEngineComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		KeyFilterModule,
		PrimeModule,
		FormsModule,
		ReactiveFormsModule,
	],
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
		FooterComponent,
		PostCardComponent,
		SearchEngineComponent,
	],
})
export class SharedModule {}
