import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [
	{
		path: '',
		component: LoginComponent
	},
	{
		path: 'forgotPassword',
		loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LoginRoutingModule {}
