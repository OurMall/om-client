import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { ApiResponse, PostCreate } from '@app/common/interfaces';

@Injectable({
	providedIn: 'root'
})
export class PostService {

	constructor(
		private readonly http: HttpClient
	) { }

	create(post: PostCreate): Observable<ApiResponse> {
		return this.http.post<ApiResponse>("post", post).pipe(
			catchError((err: HttpErrorResponse) => {
				return throwError(() => err);
			})
		);
	}
}
