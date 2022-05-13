import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class RouteService {

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly title: Title,
	) {}

	setRouteTitle(): void {
		this.router.events.pipe(
			filter((event) => event instanceof NavigationEnd),
			map(() => this.activatedRoute),
			map((route: ActivatedRoute) => {
				while(route.firstChild) {
					route = route.firstChild;
				}
				return route;
			}),
			switchMap((route) => route.data),
			map((data) => data['title'])
		).subscribe((title) => this.title.setTitle(title))
	}
}
