import { Product } from './product.interface';

export interface Invoice {
    id_client:String;
    details: Product[];
    total_price: number;
    payment_method: String;
}
