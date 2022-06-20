import { Component, OnDestroy, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { User, Workspace } from '@app/common/interfaces';
import { LocalStorageService, MessageService, UserService, WorkspaceNamespace, WorkspaceService } from '@app/common/services';

@Component({
	selector: 'app-specific-workspace',
	templateUrl: './specific-workspace.component.html',
	styleUrls: ['./specific-workspace.component.scss'],
})
export class SpecificWorkspaceComponent implements OnInit, AfterContentInit, OnDestroy {

	private subscribersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
	private workspaceSubject$: BehaviorSubject<Workspace> = new BehaviorSubject<Workspace>(null!);
	private isSubscribedSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	subscriptions: Subscription[] = [];
	workspace!: string;

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private localStorageService: LocalStorageService,
		private workspaceService: WorkspaceService,
		private workspaceNamespace: WorkspaceNamespace,
		private userService: UserService,
		private message: MessageService
	) {}

	ngOnInit(): void {
		this.subscriptions.push(
			this.activatedRoute.params.subscribe(params => {
				this.workspaceNamespace.isSubscribed({
					workspace: params['id'],
					user: this.localStorageService.get('user_id')
				});
				this.workspaceService.workspace(params['id']).subscribe({
					next: (workspace) => {
						this.workspaceSubject$.next(workspace);
						this.workspace = workspace.id;
					},
					error: (_) => {
						this.router.navigate(['404']);
					}
				})
				this.workspaceNamespace.joinWorkspace(params['id']);
				this.userService.isOwner(params['id']);
			}),
			/*this.workspaceNamespace.onJoined().subscribe(response => {
				this.message.success(`Conectado al espacio de trabajo ${response.response.workspace.profile.name}`);
			}),*/
		);
	}

	ngAfterContentInit(): void {
		this.subscriptions.push(
			this.workspaceNamespace.onSubscriptionStatus().subscribe(response => {
				this.isSubscribedSubject$.next(response.response.subscribed);
			}),
			this.workspaceNamespace.onSubscribed().subscribe(_ => this.message.success("Te haz suscrito al espacio de trabajo")),
			this.workspaceNamespace.onAlreadySubscribed().subscribe(_ => this.message.warning("Ya estás suscrito a este espacio de trabajo")),
			this.workspaceNamespace.onWorkspaceError().subscribe(_ => this.message.error("Algo salio mal", "Reintenta")),
			this.workspaceNamespace.onNotToken().subscribe(_ => {
				this.message.error("Primero debes iniciar sesión");
				this.router.navigateByUrl("login");
			}),
		)
	}

	subscribeToWorkspace(): void {
		const data: any = {
			workspace: this.workspace,
			user: this.localStorageService.get("user_id")
		};
		this.workspaceNamespace.subscribe(data);
		this.isSubscribedSubject$.next(true);
	}

	unSubscribeFromWorkspace(): void {

	}

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
		/*this.workspaceNamespace.onLeft().subscribe(_ => {
			this.message.success(`Desconectado del espacio de trabajo`);
		});*/
		this.subscriptions.forEach(subscription => {
			subscription.unsubscribe();
		});
	}

	get workspace$(): Observable<Workspace> {
		return this.workspaceSubject$.asObservable();
	}

	get isWorkspaceOwner$(): Observable<boolean> {
		return this.userService.userIsWorkspaceOwner$;
	}

	get isSubscribed$(): Observable<boolean> {
		return this.isSubscribedSubject$.asObservable();
	}

	get subscribers$(): Observable<User[]> {
		return this.subscribersSubject$.asObservable();
	}
}
