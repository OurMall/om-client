import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { WorkspaceService } from '@app/common/services';
import { Workspace } from '@app/common/interfaces';

@Component({
	selector: 'app-workspace-settings',
	templateUrl: './workspace-settings.component.html',
	styleUrls: ['./workspace-settings.component.scss'],
})
export class WorkspaceSettingsComponent implements OnInit {

	private workspaceSubject$: Subject<Workspace> = new BehaviorSubject<Workspace>(null!);

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private workspaceService: WorkspaceService
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe(params => {
			this.workspaceService.workspace(params['id']).subscribe({
				next: (workspace) => {
					this.workspaceSubject$.next(workspace);
				}
			});
		})
	}

	get workspace$(): Observable<Workspace> {
		return this.workspaceSubject$.asObservable();
	}
}
