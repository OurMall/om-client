import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedInGuard } from '@app/common/guards';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		data: {
			title: 'Our Mall',
		},
		loadChildren: () =>
			import('./modules/public/home/home.module').then((m) => m.HomeModule),
	},
	{
		path: 'signup',
		data: {
			title: 'Registrarse',
		},
		loadChildren: () =>
			import('./modules/public/signup/signup.module').then((m) => m.SignupModule),
	},
	{
		path: 'login',
		data: {
			title: 'Iniciar sesión'
		},
		loadChildren: () => import('./modules/public/login/login.module').then(m => m.LoginModule)
	},
	{
		path: 'verifyAccount',
		loadChildren: () =>
			import('./modules/tmp/verify-account/verify-account.module').then(
				(m) => m.VerifyAccountModule
			),
		canActivate: [LoggedInGuard]
	},
	{
		path: 'support',
		data: {
			title: 'Support',
		},
		loadChildren: () =>
			import('./modules/public/support/support.module').then(
				(m) => m.SupportModule
			),
		canActivate: [LoggedInGuard]
	},
	{
		path: '404',
		data: {
			title: 'No encontrado',
		},
		loadChildren: () =>
			import('./modules/public/page-not-found/page-not-found.module').then(
				(m) => m.PageNotFoundModule
			),
	},
	{
		path: '**',
		redirectTo: '404',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
