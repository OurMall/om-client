import { Permission } from './permissions.interface';

export interface Group {
	code_name: string;
	name: string;
	description: string;
	permissions?: Permission[];
	created_at?: Date;
	updated_at?: Date;
}
