import { Component, OnDestroy, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { Workspace } from '@app/common/interfaces';
import { MessageService, UserService, WorkspaceNamespace, WorkspaceService } from '@app/common/services';

@Component({
	selector: 'app-specific-workspace',
	templateUrl: './specific-workspace.component.html',
	styleUrls: ['./specific-workspace.component.scss'],
})
export class SpecificWorkspaceComponent implements OnInit, AfterContentInit, OnDestroy {

	private workspaceSubject$: BehaviorSubject<Workspace> = new BehaviorSubject<Workspace>(null!);

	isWorkspaceOwner: Observable<boolean> = this.userService.userIsWorkspaceOwner$;
	subscriptions: Subscription[] = [];

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private workspaceService: WorkspaceService,
		private workspaceNamespace: WorkspaceNamespace,
		private userService: UserService,
		private message: MessageService
	) {}

	ngOnInit(): void {
		this.subscriptions.push(
			this.activatedRoute.params.subscribe(params => {
				this.workspaceService.workspace(params['id']).subscribe({
					next: (workspace) => {
						this.workspaceSubject$.next(workspace);
					},
					error: (_) => {
						this.router.navigate(['404']);
					}
				})
				this.workspaceNamespace.joinWorkspace(params['id']);
				this.userService.isOwner(params['id']);
			}),
			this.workspaceNamespace.onJoined().subscribe(response => {
				this.message.success(`Conectado al espacio de trabajo ${response.response.workspace.profile.name}`);
			}),
		);
	}

	ngAfterContentInit(): void {   }

	leftFromWorkspace(workspace_id: string): void {
		this.workspaceNamespace.leaveWorkspace(workspace_id);
		this.router.navigateByUrl('workspaces');
	}

	ngOnDestroy(): void {
		this.subscriptions.push(
			this.activatedRoute.params.subscribe(params => {
				this.workspaceNamespace.leaveWorkspace(params['id']);
			})
		);
		this.workspaceNamespace.onLeft().subscribe(_ => {
			this.message.success(`Desconectado del espacio de trabajo`);
		});
		this.subscriptions.forEach(subscription => {
			subscription.unsubscribe();
		});
	}

	get workspace$(): Observable<Workspace> {
		return this.workspaceSubject$.asObservable();
	}
}
