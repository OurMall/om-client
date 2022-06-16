import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { WorkspaceSettingsRoutingModule } from './workspace-settings-routing.module';
import { WorkspaceSettingsComponent } from './workspace-settings.component';
import { ProductSettingsComponent } from './product-settings/product-settings.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';

@NgModule({
	declarations: [
		WorkspaceSettingsComponent,
		ProductSettingsComponent,
		GeneralSettingsComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		WorkspaceSettingsRoutingModule,
	],
})
export class WorkspaceSettingsModule {}
