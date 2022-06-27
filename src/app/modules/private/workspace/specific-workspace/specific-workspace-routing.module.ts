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
				data: {
					title: 'Productos',
				},
				loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
			},
			{
				path: 'posts',
				data: {
					title: 'Publicaciones'
				},
				loadChildren: () => import('./post/post.module').then(m => m.PostModule)
			},
		]
	},
	// {
	// 	path: 'cashRegister',
	// 	data: {
	// 		title: "Caja registradora"
	// 	},
	// 	loadChildren: () => import('./cash-register/cash-register.module').then(m => m.CashRegisterModule)
	// },
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
