import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		data: {
			title: 'Our Mall'
		},
		loadChildren: () =>
			import('./modules/public/home/home.module').then((m) => m.HomeModule),
	},
	{
		path: 'signup',
		data: {
			title: 'Registrarse'
		},
		loadChildren: () =>
			import('./modules/public/signup/signup.module').then((m) => m.SignupModule),
	},
	{
		path: 'support',
		data: {
			title: 'Support'
		},
		loadChildren: () =>
			import('./modules/public/support/support.module').then(
				(m) => m.SupportModule
			),
	},
	{
		path: '404',
		data: {
			title: 'No encontrado'
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
