import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceSettingsComponent } from './workspace-settings.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { ProductSettingsComponent } from './product-settings/product-settings.component';

const routes: Routes = [
  { 
    path: '', 
    component: WorkspaceSettingsComponent,
    children: [
      {
        path: '',
        redirectTo: 'general',
        pathMatch: 'full'
      },
      {
        path: 'general',
        component: GeneralSettingsComponent
      },
      {
        path: 'products',
        component: ProductSettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceSettingsRoutingModule { }
