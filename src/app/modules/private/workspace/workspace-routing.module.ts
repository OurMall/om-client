import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupGuard } from '@app/common/guards';
import { WorkspaceComponent } from './workspace.component';

const routes: Routes = [
	{
		path: '',
		data: {
			title: 'Espacios de trabajo'
		},
		component: WorkspaceComponent
	},
	{
		path: 'create',
		data: {
			title: "Crear espacio de trabajo",
			group: "seller"
		},
		canActivate: [GroupGuard],
		loadChildren: () => import('./create-workspace/create-workspace.module').then(m => m.CreateWorkspaceModule)
	},
	{
		path: ':id',
		loadChildren: () => import('./specific-workspace/specific-workspace.module').then(m => m.SpecificWorkspaceModule)
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
