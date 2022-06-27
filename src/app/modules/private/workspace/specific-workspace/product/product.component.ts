import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { ProductService, WorkspaceService } from '@app/common/services';
import { Product } from '@app/common/interfaces';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

	private productsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
	subscriptions: Subscription[] = [];

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private workspaceService: WorkspaceService,
		private productService: ProductService
	) { }

	ngOnInit(): void {
		this.subscriptions.push(
			this.activatedRoute.parent!.parent!.params.subscribe(params => {
				this.workspaceService.workspace(params['id']).subscribe(workspace => {
					this.productsSubject$.next(workspace.products);
				})
			})
		);
	}

	get products$(): Observable<Product[]> {
		return this.productsSubject$.asObservable();
	}
}
