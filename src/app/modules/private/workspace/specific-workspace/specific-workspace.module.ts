import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecificWorkspaceRoutingModule } from './specific-workspace-routing.module';
import { SpecificWorkspaceComponent } from './specific-workspace.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SpecificWorkspaceComponent,
  ],
  imports: [
    CommonModule,
	FormsModule,
	ReactiveFormsModule,
    SpecificWorkspaceRoutingModule
  ]
})
export class SpecificWorkspaceModule { }
