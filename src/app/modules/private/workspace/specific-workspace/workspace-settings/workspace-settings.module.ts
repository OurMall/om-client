import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceSettingsRoutingModule } from './workspace-settings-routing.module';
import { WorkspaceSettingsComponent } from './workspace-settings.component';


@NgModule({
  declarations: [
    WorkspaceSettingsComponent
  ],
  imports: [
    CommonModule,
    WorkspaceSettingsRoutingModule
  ]
})
export class WorkspaceSettingsModule { }
