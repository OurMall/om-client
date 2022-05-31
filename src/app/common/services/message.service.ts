import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root',
})
export class MessageService {

	constructor(private toastr: ToastrService) {}

	success(detail: string, title?: string, options?: any): void {
		const newTitle: string = title != undefined ? title : 'Hecho';
		this.toastr.success(detail, newTitle, {
			toastClass: 'ngx-toastr om-toast-success'
		});
	}

	error(detail: string, title?: string, options?: any): void {
		const newTitle: string = title != undefined ? title : 'Error';
		this.toastr.error(detail, newTitle, {
			toastClass: 'ngx-toastr om-toast-error'
		});
	}

	info(detail: string, title?: string, options?: any): void {
		const newTitle: string = title != undefined ? title : 'Información';
		this.toastr.info(detail, newTitle, {
			toastClass: 'ngx-toastr om-toast-info'
		});
	}

	warning(detail: string, title?: string, options?: any): void {
		const newTitle: string = title != undefined ? title : 'Advertencia';
		this.toastr.warning(detail, newTitle, {
			toastClass: 'ngx-toastr om-toast-warning'
		});
	}
}
