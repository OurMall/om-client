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
		data: {
			title: 'Recuperación de contraseña'
		},
		loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
	},
	{
		path: 'resetPassword',
		data: {
			title: 'Restaurar contraseña'
		},
		loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LoginRoutingModule {}
