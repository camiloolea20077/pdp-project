import React from 'react';
import { Button } from 'primereact/button';
import '../AddToCartButton/AddToCartButton.scss';

interface Props {
  onAdd: () => void;
}

const AddToCartButton: React.FC<Props> = ({ onAdd }) => {
  return (
    <Button label="Agregar al Carrito" icon="pi pi-shopping-cart" onClick={onAdd} className="add-to-cart-button" />
  );
};

export default AddToCartButton;
