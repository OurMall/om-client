import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

import { Service } from '@app/common/interfaces';

@Injectable({
	providedIn: 'root',
})
export class ServiceService {
	private servicesSubject$: BehaviorSubject<Service[]> = new BehaviorSubject<Service[]>(
		[]
	);
	services$: Observable<Service[]> = this.servicesSubject$.asObservable();

	constructor(private readonly http: HttpClient) {}

	services(): Observable<Service[]> {
		return this.http.get<Service[]>('service').pipe(
			tap({
				next: (response) => {
					this.servicesSubject$.next(response);
				},
			}),
			catchError((err: HttpErrorResponse) => {
				return throwError(() => err);
			})
		);
	}
}
