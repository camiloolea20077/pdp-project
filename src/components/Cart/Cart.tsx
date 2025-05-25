import React from 'react';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';
import useCartStore  from '../store/useCartStore';

import './Cart.scss';
import { CurrencyFormat } from '../../utils';

interface Props {
  visible: boolean;
  onHide: () => void;
}

const Cart: React.FC<Props> = ({ visible, onHide }) => {

  const cart = useCartStore(state => state.getCartItems());
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const clearCart = useCartStore(state => state.clearCart);
  const toast = React.useRef<Toast>(null);
  const totalValue = useCartStore(state => state.getTotalValue());

/**
 * Removes an item from the cart at the specified index and displays a toast notification.
 * 
 * @param index - The index of the item in the cart to be removed.
 */

  const handleRemoveItem = (index: number) => {
    removeFromCart(index);
    toast.current?.show({ severity: 'info', summary: 'Producto eliminado', life: 2000 });
  };

  const handleClearCart = () => {
    clearCart();
    toast.current?.show({ severity: 'warn', summary: 'Carrito vaciado', life: 2000 });
  };

  const renderCartItems = () => {
    return (
          <>
            {cart.map((item, i) => (
              <div key={i} className="cart-item">
                <img src={item.product.images[0]} alt={item.product.title} className="cart-item-image" />
                <div className="cart-item-info">
                  <p className="cart-item-title">{item.product.title}</p>
                  <p>Talla: {item.size}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio: {CurrencyFormat(item.product.priceDiscount * item.quantity)}</p>
                </div>
                <Button
                  icon="pi pi-trash"
                  className="p-button-text p-button-danger"
                  onClick={() => handleRemoveItem(i)}
                />
              </div>
            ))}
            <div className="cart-total-section">
              <p className="cart-total">Total: {CurrencyFormat(totalValue)}</p>
              <div className='flex flex-column gap-3 w-full'>
                <Button label="Finalizar compra" className="p-button-success w-full" />
                <Button label="Vaciar carrito" className="p-button-danger w-full" onClick={handleClearCart} />
              </div>
            </div>
          </>
        )
  }

  return (
    <>
      <Toast ref={toast} />
      <Sidebar visible={visible} onHide={onHide} position="right" style={{ width: '350px' }}>
        <h3>Carrito de Compras</h3>
        {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : renderCartItems()} 
      </Sidebar>
    </>
  );
};

export default Cart;
