import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Workspace } from '@app/common/interfaces';
import { CategoryService, WorkspaceService } from '@app/common/services';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'app-workspace',
	templateUrl: './workspace.component.html',
	styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit, OnDestroy {

	workspaces$: Observable<Workspace[]> = this.workspaceService.workspaces$;
	categories$: Observable<Category[]> = this.categoryService.categories$;

	subscriptions: Subscription[] = [];
	code_name?: string;

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private workspaceService: WorkspaceService,
		private categoryService: CategoryService
	) {}

	ngOnInit(): void {
		this.subscriptions.push(
			this.workspaceService.workspaces().subscribe(),
			this.categoryService.categories().subscribe()
		);
	}

	filterByCategory(): void {
		this.subscriptions.push(
			this.activatedRoute.queryParams.subscribe(params => {
				this.subscriptions.push(
					this.workspaceService.workspaces(params['category']).subscribe()
				);
			}),
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => {
			subscription.unsubscribe();
		});
	}
}
