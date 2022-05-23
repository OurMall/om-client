import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Category } from '@app/common/interfaces';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {

	private categoriesSubject$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
	categories$: Observable<Category[]> = this.categoriesSubject$.asObservable();

	constructor(
		private readonly http: HttpClient
	) {}

	categories(): Observable<Category[]> {
		return this.http.get<Category[]>("category").pipe(
			tap({
				next: (response) => {
					this.categoriesSubject$.next(response);
				}
			}),
			catchError((err: HttpErrorResponse) => {
				console.log(err);
				return throwError(() => err);
			})
		)
	}

	category(id: string): void {}
}
