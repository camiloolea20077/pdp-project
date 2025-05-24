import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import './Cart.scss';

interface Product {
  id: string;
  title: string;
  images: string[];
  priceDiscount: number;
}

interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface Props {
  visible: boolean;
  onHide: () => void;
  cart: CartItem[];
  removeItem: (index: number) => void;
}

const Cart: React.FC<Props> = ({ visible, onHide, cart, removeItem }) => {
  const total = cart.reduce((acc, item) => acc + item.product.priceDiscount * item.quantity, 0);

  return (
    <Sidebar visible={visible} onHide={onHide} position="right" style={{ width: '350px' }}>
      <h3>Carrito de Compras</h3>
      {cart.length === 0 && <p>El carrito está vacío.</p>}
      {cart.map((item, i) => (
        <div key={i} className="cart-item">
          <img src={item.product.images[0]} alt={item.product.title} className="cart-item-image" />
          <div className="cart-item-info">
            <p className="cart-item-title">{item.product.title}</p>
            <p>Talla: {item.size}</p>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio: ${item.product.priceDiscount * item.quantity}</p>
          </div>
          <Button icon="pi pi-trash" className="p-button-text p-button-danger" onClick={() => removeItem(i)} />
        </div>
      ))}
      {cart.length > 0 && (
        <div className="cart-total-section">
          <p className="cart-total">Total: ${total}</p>
          <Button label="Finalizar Compra" className="p-button-success mt-2" />
        </div>
      )}
    </Sidebar>
  );
};

export default Cart;
