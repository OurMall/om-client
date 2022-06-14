import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpecificWorkspaceComponent } from './specific-workspace.component';

const routes: Routes = [
	{
		path: '',
		component: SpecificWorkspaceComponent,
		children: [
			{
				path: '',
				redirectTo: 'overview',
				pathMatch: 'full'
			},
			{
				path: 'overview',
				data: {
					title: 'Resumen'
				},
				loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule)
			},
			{
				path: 'products',
				loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
			},
		]
	},
	{ 
		path: 'settings', 
		data: {
			title: 'Configuraciones'
		},
		loadChildren: () => import('./workspace-settings/workspace-settings.module').then(m => m.WorkspaceSettingsModule) 
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecificWorkspaceRoutingModule { }
