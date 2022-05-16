import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { RouteService, AuthorizationService } from '@app/common/services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

	constructor(
		private routeService: RouteService,
		private authorizationService: AuthorizationService
	) {}

	ngOnInit(): void {
		this.routeService.setRouteTitle();
		this.authorizationService.authorizeKnownClient().subscribe();
	}
}
