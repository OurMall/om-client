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

	createComment(data: any): void {
		this.emit('create_comment', data);
	}

	workspaceComments(workspace: string): void {
		this.emit('workspace_comments', {
			workspace
		});
	}

	subscribe(data: any): void {
		this.emit('subscribe_workspace', data);
	}

	workspaceSubscribers(workspace: string): void {
		this.emit('workspace_subscribers', {
			workspace
		});
	}

	isSubscribed(data: any): void {
		this.emit('is_subscribed_workspace', data);
	}

	unsubscribe(data: any): void {
		this.emit('unsubscribe_workspace', data);
	}

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

	onAlreadyCommented(): Observable<ApiResponse> {
		return this.fromEvent<ApiResponse>('already_commented');
	}

	onNewComment(): Observable<ApiResponse> {
		return this.fromEvent<ApiResponse>('new_comment');
	}

	onSubscribed(): Observable<ApiResponse> {
		return this.fromEvent<ApiResponse>('subscribed');
	}

	onUnsubscribed(): Observable<ApiResponse> {
		return this.fromEvent<ApiResponse>('unsubscribed');
	}

	onReviews(): Observable<ApiResponse> {
		return this.fromEvent<ApiResponse>('reviews');
	}

	onSubscribersList(): Observable<ApiResponse> {
		return this.fromEvent<ApiResponse>('subscribers_list');
	}

	onSubscriptionStatus(): Observable<ApiResponse> {
		return this.fromEvent<ApiResponse>('subscription_status');
	}

	onNotToken(): Observable<ApiResponse> {
		return this.fromEvent<ApiResponse>('not_token');
	}

	onAlreadySubscribed(): Observable<ApiResponse> {
		return this.fromEvent<ApiResponse>('already_subscribed');
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
