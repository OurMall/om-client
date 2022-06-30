import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Invoice } from '@app/common/interfaces';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class InvoiceService {
  getInvoices() {
    throw new Error('Method not implemented.');
  }

	constructor(
		private readonly http: HttpClient
	) { }

	invoices(): Observable<Invoice[]> {
		return this.http.get<Invoice[]>("");
	}

	create(invoice: Invoice): Observable<ApiResponse> {
		return this.http.post<ApiResponse>("", invoice);
	}
}
