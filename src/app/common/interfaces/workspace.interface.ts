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
	profile: WorkspaceProfile,
	category: any;
	tags: string[];
	services: any[];
}
