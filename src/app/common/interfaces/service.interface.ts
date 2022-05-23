export interface ServiceCreate {
	id?: string;
	code_name: string;
	name: string;
	description: string;
	activate: boolean;
}

export interface Service extends ServiceCreate {
	created_at: Date;
	updated_at: Date;
}
