import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Workspace } from '@app/common/interfaces';
import { WorkspaceNamespace } from '@app/common/services';

@Component({
	selector: 'app-workspace-card',
	templateUrl: './workspace-card.component.html',
	styleUrls: ['./workspace-card.component.scss'],
})
export class WorkspaceCardComponent implements OnInit {

	@Input() workspace!: Workspace;

	constructor(
		private readonly router: Router,
	) {}

	ngOnInit(): void {}

	joinWorkspace(id: string): void {
		this.router.navigate([`workspaces/${id}`]);
	}
}
