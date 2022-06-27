import { Component, OnInit, AfterContentInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { RouteService, AuthorizationService, ThemeService } from '@app/common/services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentInit {

	constructor(
		private primengConfig: PrimeNGConfig,
		private routeService: RouteService,
		private authorizationService: AuthorizationService,
		private themeService: ThemeService
	) {}

	ngOnInit(): void {
		this.primengConfig.ripple = true;
		this.routeService.setRouteTitle();
		this.themeService.setUpTheme();
	}

	ngAfterContentInit(): void {
		this.authorizationService.knownToken$.subscribe(hasToken => {
			if(!hasToken) {
				this.authorizationService.authorizeKnownClient().subscribe();
			}
		});
	}
}
