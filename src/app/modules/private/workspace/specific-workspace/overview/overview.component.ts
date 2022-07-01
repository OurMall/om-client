import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { Workspace } from '@app/common/interfaces';
import { WorkspaceService } from '@app/common/services';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

	private workspaceSubject$: BehaviorSubject<Workspace> = new BehaviorSubject<Workspace>(null!);

	workspace!: string;
	subscriptions: Subscription[] = [];

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private workspaceService: WorkspaceService
	) { }

	ngOnInit(): void {
		this.subscriptions.push(
			this.activatedRoute.parent!.parent!.params.subscribe(params => {
				this.workspace = params['id'];
				this.subscriptions.push(
					this.workspaceService.workspace(this.workspace).subscribe(workspace => {
						this.workspaceSubject$.next(workspace);
					})
				);
			})
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => {
			subscription.unsubscribe();
		});
	}

	get workspace$(): Observable<Workspace> {
		return this.workspaceSubject$.asObservable();
	}
}
