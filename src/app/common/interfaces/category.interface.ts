export interface CategoryCreate {
	code_name: string;
	name: string;
	description: string;
}

export interface Category extends CategoryCreate {
	id: string;
	created_at: Date;
	updated_at: Date;
}
