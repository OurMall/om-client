export enum ProductStatus {
	NEW="new",
	USED="used",
	REFURBISHED="refurbished"
}

export interface ProducCreate {
	name: string;
	detail: string;
	price: number;
	stock: number;
	images?: string[];
	status: ProductStatus;
	is_available: boolean;
}

export interface ProductModel extends ProducCreate {

}
