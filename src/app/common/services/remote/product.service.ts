import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

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

	productsNames(): Observable<any[]> {
		return this.http.get<any[]>("product").pipe(
			map(product => product.map(element => element["name"]))
		);
	}

	product(id: string): Observable<Product> {
		return this.http.get<Product>(`product/${id}`);
	}

	createProduct(product: ProductCreate): Observable<ApiResponse> {
		return this.http.post<ApiResponse>('product', product).pipe(
			catchError((err: HttpErrorResponse) => {
				return throwError(() => err);
			})
		);
	}
}
