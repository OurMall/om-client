import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit {

	filesSubject$: BehaviorSubject<FileList> = new BehaviorSubject<FileList>(null!);
	files!: FileList;

	@Input() multiple: boolean = false;
	@Input() label!: string;
	@Output() selectedFiles: EventEmitter<{
		name: string,
		size: number,
		type: string,
	}[]> = new EventEmitter();

	constructor() { }

	ngOnInit(): void {}

	onChangeFilesToUpload(event: Event): void {
		const files = (event.target as HTMLInputElement).files;
		if(files?.length == 0) return;
		const file = {
			name: files![0].name,
			size: files![0].size,
			type: files![0].type
		}
		console.log(file)
		this.selectedFiles.emit([file]);
	}

	get files$(): Observable<FileList> {
		return this.filesSubject$.asObservable();
	}
}
