import { Workspace, Permission, Group } from './';

export interface UserLogin {
	email: string;
	password?: string;
}

export enum Gender {
	MALE = 'male',
	FEMALE = 'female',
	OTHER = 'other',
}

export interface Groups {
	value: string;
}

export interface Profile {
	picture?: string;
	website?: string;
	biography?: string;
}

export interface UserSignup extends UserLogin {
	given_name: string;
	family_name: string;
	middle_name?: string;
	phone_number: string;
	birthdate: string | Date;
	gender: Gender;
	accept_terms?: boolean;
}

export interface User extends UserSignup {
	id: string;
	name: string;
	profile: Profile;
	workspaces: Workspace[];
	permissions: Permission[];
	groups: Group[];
	created_at: Date;
	updated_at: Date;
	email_verified: boolean;
	phone_number_verified: boolean;
	is_blocked: boolean;
	is_disabled: boolean;
}
