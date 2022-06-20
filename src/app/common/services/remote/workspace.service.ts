import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, Observable, take, tap, throwError } from 'rxjs';

import { ApiResponse, Workspace, WorkspaceCreate } from '@app/common/interfaces';
import { MessageService } from '@app/common/services';

@Injectable({
	providedIn: 'root',
})
export class WorkspaceService {

	private workspacesSubject$: Subject<Workspace[]> = new BehaviorSubject<Workspace[]>([]);

	constructor(
		private readonly http: HttpClient,
		private message: MessageService
	) {}

	workspaces(
		category?: string,
		sort?: string,
		limit?: number,
		skip?: number
	): Observable<Workspace[]> {
		const params = new HttpParams()
			.set('category', category!)
			/*.set('sort', sort!)
			.set('limit', limit!)
			.set('skip', skip!)*/
		return this.http.get<Workspace[]>('workspace', {params}).pipe(
			tap((workspaces) => {
				this.workspacesSubject$.next(workspaces);
			}),
			catchError((err: HttpErrorResponse) => {
				return throwError(() => err);
			})
		);
	}

	workspace(id: string): Observable<Workspace> {
		return this.http.get<Workspace>(`workspace/${id}`).pipe(
			take(1),
			catchError((err: HttpErrorResponse) => {
				console.log(err)
				return throwError(() => err);
			})
		);
	}

	createWorkspace(workspace: WorkspaceCreate): Observable<ApiResponse> {
		return this.http.post<ApiResponse>('workspace', workspace).pipe(
			take(1),
			tap((_) => {
				this.message.success(
					'Hemos creado el espacio de trabajo',
					'Felicidades!'
				);
			}),
			catchError((err: HttpErrorResponse) => {
				console.log(err);
				this.message.error(
					'El espacio de trabajo ya existe, reintenta',
					'Oh-no!'
				);
				return throwError(() => err);
			})
		);
	}

	get workspaces$(): Observable<Workspace[]> {
		return this.workspacesSubject$.asObservable();
	}
}
