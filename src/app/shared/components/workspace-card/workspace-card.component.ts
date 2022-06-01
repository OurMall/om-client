import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Workspace } from '@app/common/interfaces';

@Component({
	selector: 'app-workspace-card',
	templateUrl: './workspace-card.component.html',
	styleUrls: ['./workspace-card.component.scss'],
})
export class WorkspaceCardComponent implements OnInit {

	@Input() workspace$!: Observable<Workspace>;

	constructor() {}

	ngOnInit(): void {}
}
