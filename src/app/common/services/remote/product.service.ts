import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { ApiResponse, Product, ProductCreate } from '@app/common/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
		private readonly http: HttpClient
	) { }

	products(): Observable<Product[]> {
		return this.http.get<Product[]>("product");
	}

	product(id: string): Observable<Product> {
		return this.http.get<Product>('product');
	}

	createProduct(product: ProductCreate): Observable<ApiResponse> {
		return this.http.post<ApiResponse>('product', product).pipe(
			catchError((err: HttpErrorResponse) => {
				console.log(err);
				return throwError(() => err);
			})
		);
	}
}
