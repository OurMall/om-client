import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root',
})
export class MessageService {

	constructor(private toastr: ToastrService) {}

	success(detail: string, title?: string, options?: any): void {
		const newTitle: string = title != undefined ? title : 'Hecho';
		this.toastr.success(detail, newTitle, options);
	}

	error(detail: string, title?: string, options?: any): void {
		const newTitle: string = title != undefined ? title : 'Error';
		this.toastr.error(detail, newTitle, options);
	}

	info(detail: string, title?: string, options?: any): void {
		const newTitle: string = title != undefined ? title : 'Información';
		this.toastr.info(detail, newTitle, options);
	}

	warning(detail: string, title?: string, options?: any): void {
		const newTitle: string = title != undefined ? title : 'Advertencia';
		this.toastr.warning(detail, newTitle, options);
	}
}
