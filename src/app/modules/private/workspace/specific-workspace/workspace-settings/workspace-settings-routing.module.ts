import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceSettingsComponent } from './workspace-settings.component';

const routes: Routes = [{ path: '', component: WorkspaceSettingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceSettingsRoutingModule { }
