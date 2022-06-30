import { Category, Product, Post, Review } from './';

export interface WorkspaceProfile {
	name: string;
	description: string;
	slogan: string;
	logo: string;
	background_color?: string;
	images?: string[];
	social_media?: any[];
	address?: any;
}

export interface WorkspaceCreate {
	profile: WorkspaceProfile;
	category: any;
	tags: string[];
	services: any[];
}

export interface Workspace extends WorkspaceCreate {
	id: string;
	category: Category;
	suscribers: string[];
	products: Product[];
	posts: Post[];
	notifications: any[];
	reviews: Review[];
	is_verified: boolean;
	created_at: Date;
	updated_at: Date;
}
