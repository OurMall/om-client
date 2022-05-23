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

export interface UserSignup extends UserLogin {
	given_name: string;
	family_name: string;
	middle_name?: string;
	phone_number: string;
	birthdate: string | Date;
	gender: Gender;
	accept_terms: boolean;
}

export interface User extends UserSignup {

}
