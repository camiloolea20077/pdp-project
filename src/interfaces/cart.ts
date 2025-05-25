import { Product } from "./product";

export interface CartItem {
    product: Product;
    size: string;
    color: string;
    quantity: number;
}