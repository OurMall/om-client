import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { VerifyAccountComponent } from './components';

const routes: Routes = [
	{
		path: '',
		component: ProfileComponent,
	},
	{
		path: 'verifyAccount',
		data: {
			title: 'Verificar cuenta',
		},
		component: VerifyAccountComponent,
	},
	{
		path: ':id',
		data: {
			title: 'Perfil'
		},
		loadChildren: () => import('./specific-profile/specific-profile.module').then(m => m.SpecificProfileModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfileRoutingModule {}
