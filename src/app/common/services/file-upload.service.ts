import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
	private readonly http: HttpClient
  ) { }

  upload(files: File): Observable<any> {
	const fileRequest: FormData = new FormData();
	if(files instanceof FileList) {
		console.log()
	}
	fileRequest.append('file', files, files.name);
	return this.http.post<any>("upload", fileRequest).pipe();
  }
}
