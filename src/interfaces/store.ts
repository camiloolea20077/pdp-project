import { CartItem } from "./cart";
import { Product } from "./product";

export interface CartState {
    cart: CartItem[];

    // Setters
    addToCart: (product: Product, size: string, color: string) => void;
    removeFromCart: (index: number) => void;
    clearCart: () => void;
    getTotalValue: () => number;
    getTotalQuantity: () => number;
    // Getters
    getCartCount: () => number;
    getCartItems: () => CartItem[];
    getCartTotalValue: () => number;
    getCartTotalQuantity: () => number;
}