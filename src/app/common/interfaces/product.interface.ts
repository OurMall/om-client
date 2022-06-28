export enum ProductStatus {
	NEW="new",
	USED="used",
	REFURBISHED="refurbished"
}

export enum Currency {
	USD="USD",
	COP="COP"
}

export interface Price {
	value: number;
	currency: Currency;
}

export interface ProductCreate {
	name?: string;
	code?: string; // For cash register integration.
	quantity?: number; // For cash register integration.
	detail?: string;
	price?: Price;
	stock?: number;
	images?: string[];
	status?: ProductStatus;
	is_available?: boolean;
}

export interface Product extends ProductCreate {
	vat: number;
	created_at?: Date;
	updated_at?: Date;
}
