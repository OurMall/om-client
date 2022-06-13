import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

import { Category } from '@app/common/interfaces';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {

	private categoriesSubject$: BehaviorSubject<Category[]> = new BehaviorSubject<
		Category[]
	>([]);

	constructor(private readonly http: HttpClient) {}

	categories(): Observable<Category[]> {
		return this.http.get<Category[]>('category').pipe(
			tap({
				next: (categories) => {
					this.categoriesSubject$.next(categories);
				},
			}),
			catchError((err: HttpErrorResponse) => {
				return throwError(() => err);
			})
		);
	}

	category(id: string): void {}

	get categories$(): Observable<Category[]> {
		return this.categoriesSubject$.asObservable();
	}
}
