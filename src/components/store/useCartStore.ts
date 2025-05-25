import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState } from '../../interfaces/store';


const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],

            addToCart: (product, size, color) => {
                set((state) => ({
                    cart: [...state.cart, { product, size, color, quantity: 1 }],
                }));
            },

            removeFromCart: (index) => {
                set((state) => ({
                    cart: state.cart.filter((_, i) => i !== index),
                }));
            },

            clearCart: () => {
                set(() => ({ cart: [] }));
            },

            getCartCount: () => get().cart.length,

            getCartItems: () => get().cart,

            getCartTotalValue: () =>
                get().cart.reduce((total, item) => total + item.product.priceDiscount * item.quantity, 0),

            getCartTotalQuantity: () =>
                get().cart.reduce((total, item) => total + item.quantity, 0),
            getTotalValue: () => {
                return get().cart.reduce((total, item) => total + item.product.priceDiscount * item.quantity, 0);
            },

            getTotalQuantity: () => {
                return get().cart.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);

export default useCartStore;