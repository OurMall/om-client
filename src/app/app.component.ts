import { Component, OnInit, AfterContentInit } from '@angular/core';

import { RouteService, AuthorizationService } from '@app/common/services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentInit {

	constructor(
		private routeService: RouteService,
		private authorizationService: AuthorizationService
	) {}

	ngOnInit(): void {
		this.routeService.setRouteTitle();
	}

	ngAfterContentInit(): void {
		this.authorizationService.knownToken$.subscribe(hasToken => {
			if(!hasToken) {
				this.authorizationService.authorizeKnownClient().subscribe();
			}
		});
	}
}
