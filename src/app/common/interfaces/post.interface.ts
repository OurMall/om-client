export interface PostCreate {
	title: string;
	content: string;
	workspace: string;
	image: string;
	is_public: boolean;
}

export interface Post extends PostCreate {
	id: string;
	created_at: Date;
	updated_at: Date;
}
