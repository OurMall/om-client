import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class WorkspaceService {

	constructor(
		private readonly http: HttpClient
	) {}

	workspaces() {}

	createWorkspace(workspace: any): Observable<any> {
		return this.http.post<any>("workspace", workspace).pipe(

		);
	}
}
