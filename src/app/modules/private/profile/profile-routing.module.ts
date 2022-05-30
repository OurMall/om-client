import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';

const routes: Routes = [
	{
		path: '',
		component: ProfileComponent
	},
	{
		path: 'verifyAccount',
		data: {
			title: "Verificar cuenta"
		},
		component: VerifyAccountComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfileRoutingModule {}
