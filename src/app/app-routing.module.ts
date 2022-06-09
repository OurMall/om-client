import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedInGuard, NotLoggedGuard } from '@app/common/guards';

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
		canActivate: [LoggedInGuard],
		loadChildren: () =>
			import('./modules/public/signup/signup.module').then((m) => m.SignupModule),
	},
	{
		path: 'login',
		data: {
			title: 'Iniciar sesión',
		},
		canActivate: [LoggedInGuard],
		loadChildren: () =>
			import('./modules/public/login/login.module').then((m) => m.LoginModule),
	},
	{
		path: 'profile',
		data: {
			title: 'Perfil',
		},
		canActivate: [NotLoggedGuard],
		loadChildren: () =>
			import('./modules/private/profile/profile.module').then(
				(m) => m.ProfileModule
			),
	},
	{
		path: 'workspaces',
		data: {
			title: 'Espacios de trabajo'
		},
		loadChildren: () => import('./modules/private/workspace/workspace.module').then(m => m.WorkspaceModule)
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
		canActivate: [NotLoggedGuard],
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
