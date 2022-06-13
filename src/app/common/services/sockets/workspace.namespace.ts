import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Socket } from 'ngx-socket-io';

import { environment } from '@environment/environment';
import { MessageService } from "@app/common/services";
import { ApiResponse } from "@app/common/interfaces";

@Injectable()
export class WorkspaceNamespace extends Socket {

	constructor(
		private message: MessageService
	) {
		super({
			url: `${environment.authorizationServer.websocket_endpoint}/workspace`,
			options: {
				reconnection: true,
				autoConnect: false,
				timeout: 100000,
				withCredentials: true
			}
		});
	}

	connectToWorkspace(): void {
		this.connect();
	}

	joinWorkspace(workspace: string): void {
		this.connectToWorkspace();
		this.emit('join_workspace', {
			workspace
		});
	}

	subscribe(): void {  }

	unsubscribe(): void {  }

	leaveWorkspace(workspace: string): void {
		this.emit('leave_workspace', {
			workspace
		});
	}

	onConnected(): Observable<ApiResponse> {
		return this.fromEvent<ApiResponse>('connected');
	}

	onJoined(): Observable<ApiResponse> {
		return this.fromEvent<ApiResponse>('joined');
	}

	onLeft(): Observable<ApiResponse> {
		return this.fromEvent<ApiResponse>('left');
	}

	onAlreadyConnected(): Observable<ApiResponse> {
		return this.fromEvent<ApiResponse>('already_connected');
	}

	onNonExistentWorkspace(): Observable<ApiResponse> {
		return this.fromEvent<ApiResponse>('nonexistent_workspace');
	}

	onWorkspaceError(): Observable<ApiResponse> {
		return this.fromEvent<ApiResponse>('workspace_error');
	}
}
