import React from 'react';
import { Button } from 'primereact/button';

interface Props {
  onAdd: () => void;
}

const AddToCartButton: React.FC<Props> = ({ onAdd }) => {
  return (
    <Button label="Agregar al Carrito" icon="pi pi-shopping-cart" onClick={onAdd} className="add-to-cart-button mt-3" />
  );
};

export default AddToCartButton;
