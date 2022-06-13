import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
		path: ':id',
		loadChildren: () => import('./specific-workspace/specific-workspace.module').then(m => m.SpecificWorkspaceModule)
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
