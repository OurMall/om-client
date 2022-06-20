import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SpecificWorkspaceRoutingModule } from './specific-workspace-routing.module';
import { SpecificWorkspaceComponent } from './specific-workspace.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    SpecificWorkspaceComponent,
  ],
  imports: [
    CommonModule,
	FormsModule,
	SharedModule,
	ReactiveFormsModule,
    SpecificWorkspaceRoutingModule
  ]
})
export class SpecificWorkspaceModule { }
