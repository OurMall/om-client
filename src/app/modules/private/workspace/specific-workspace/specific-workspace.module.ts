import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecificWorkspaceRoutingModule } from './specific-workspace-routing.module';
import { SpecificWorkspaceComponent } from './specific-workspace.component';

@NgModule({
  declarations: [
    SpecificWorkspaceComponent,
  ],
  imports: [
    CommonModule,
    SpecificWorkspaceRoutingModule
  ]
})
export class SpecificWorkspaceModule { }
