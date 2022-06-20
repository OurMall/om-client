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
	name: string;
	detail: string;
	price: Price;
	stock: number;
	images?: string[];
	status: ProductStatus;
	is_available: boolean;
}

export interface Product extends ProductCreate {
	created_at: Date;
	updated_at: Date;
}
