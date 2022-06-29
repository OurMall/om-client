import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, take, catchError, throwError } from 'rxjs';

import { ApiResponse } from '@app/common/interfaces';
import { MessageService } from '@app/common/services';

@Injectable({
	providedIn: 'root',
})
export class SearchEngineService {

	constructor(
		private readonly http: HttpClient,
		private message: MessageService
	) {}

	search(query: string, limit: number = 5): Observable<ApiResponse> {
		const params = new HttpParams()
			.set("query", query)
			.set("limit", limit)
		return this.http.get<ApiResponse>("search", {params}).pipe(
			take(1),
			catchError((err: HttpErrorResponse) => {
				console.log(err);
				this.message.error("Algo salió mal");
				return throwError(() => err);
			})
		);
	}
}
