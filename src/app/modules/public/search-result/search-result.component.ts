import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, Workspace } from '@app/common/interfaces';
import { SearchEngineService } from '@app/common/services';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

type ResultsType = "products" | "workspaces";

@Component({
	selector: 'app-search-result',
	templateUrl: './search-result.component.html',
	styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit, OnDestroy {

	private workspacesSubject$: BehaviorSubject<Workspace[]> = new BehaviorSubject<Workspace[]>([]);
	private productsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

	subscriptions: Subscription[] = [];
	section: ResultsType = "products";

	constructor(
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
		private searchEngineService: SearchEngineService
	) {}

	ngOnInit(): void {
		this.subscriptions.push(
			this.activatedRoute.queryParams.subscribe(params => {
				if(!params['query']) {
					this.router.navigateByUrl("404");
					return;
				}
				this.subscriptions.push(
					this.searchEngineService.search(params['query'], params['limit']).subscribe(data => {
						console.log(data);
						this.productsSubject$.next(data.response.products);
						this.workspacesSubject$.next(data.response.workspaces);
					})
				);
			})
		)
	}

	changeSection(section: ResultsType): void {
		this.section = section;
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => {
			subscription.unsubscribe();
		});
	}

	get products$(): Observable<Product[]> {
		return this.productsSubject$.asObservable();
	}

	get workspaces$(): Observable<Workspace[]> {
		return this.workspacesSubject$.asObservable();
	}

}
