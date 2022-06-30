import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateWorkspaceRoutingModule } from './create-workspace-routing.module';
import { CreateWorkspaceComponent } from './create-workspace.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from '@app/shared/prime.module';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    CreateWorkspaceComponent
  ],
  imports: [
    CommonModule,
    CreateWorkspaceRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	PrimeModule,
	SharedModule,
  ]
})
export class CreateWorkspaceModule { }
