import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, take, tap, throwError } from 'rxjs';

import { ApiResponse, WorkspaceCreate } from '@app/common/interfaces';
import { MessageService } from '@app/common/services';

@Injectable({
	providedIn: 'root',
})
export class WorkspaceService {
	constructor(private readonly http: HttpClient, private message: MessageService) {}

	workspaces() {}

	createWorkspace(workspace: WorkspaceCreate): Observable<ApiResponse> {
		return this.http.post<ApiResponse>('workspace', workspace).pipe(
			take(1),
			tap((response) => {
				console.log(response);
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
}
